console.log("[spawner] Client Resource Started")

import h from "../hashes.json"
const hashes = h as { [key: string]: string }

RegisterCommand('heal', () => {
  const id = PlayerId()
  SetEntityHealth(GetPlayerPed(id), 200)
  SetVehicleFixed(GetVehiclePedIsIn(GetPlayerPed(id), false))
}, false)

// teleport to waypoint fivem command
RegisterCommand('tpm', () => {
  const waypoint = GetFirstBlipInfoId(8)
  if (!DoesBlipExist(waypoint)) return console.log("[spawner] No waypoint set")
  const [x, y, z] = GetBlipInfoIdCoord(waypoint)
  const id = PlayerId()
  SetPedCoordsKeepVehicle(GetPlayerPed(id), x, y, 0)

  // set player invisible
  SetEntityVisible(GetPlayerPed(id), false, false)

  let groundZ = z
  const tickId = setTick(() => {
    groundZ += 1
    SetEntityCoordsNoOffset(GetPlayerPed(id), x, y, groundZ, false, false, false)
    const [_, z2] = GetGroundZFor_3dCoord(x, y, groundZ, false)
    if (z2 !== 0) {
      clearTick(tickId)
      SetPedCoordsKeepVehicle(GetPlayerPed(id), x, y, z2)
      SetEntityVisible(GetPlayerPed(id), true, false)
    }
  })
}, false)

RegisterCommand('aimObj', () => {
  // show aim target object name
  setTick(() => {
    const [_, entity] = GetEntityPlayerIsFreeAimingAt(PlayerId())
    if (!entity) return
    const [x, y, z] = GetEntityCoords(entity, true)
    
    // get object name
    const hash = GetEntityModel(entity)
    const [onScreen, x2, y2] = GetScreenCoordFromWorldCoord(x, y, z + 1.5)
    if (!onScreen) return
    SetTextFont(0)
    SetTextScale(0.0, .5)
    SetTextColour(255, 255, 255, 255)
    SetTextOutline()
    SetTextCentre(true)
    SetTextEntry("STRING")
    AddTextComponentString(hashes[hash])
    DrawText(x2, y2)

    if (IsControlJustPressed(0, 51)) {
      console.log(hashes[hash])
    }
  })
}, false)


// set night
RegisterCommand('night', () => {
  NetworkOverrideClockTime(23, 0, 0)
  SetBlackout(true)
}, false)

// set day
RegisterCommand('day', () => {
  NetworkOverrideClockTime(12, 0, 0)
  SetBlackout(false)
}, false)