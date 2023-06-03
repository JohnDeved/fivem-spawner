import h from '../hashes.json'

console.log('[spawner] Client Resource Started')
const hashes = h as { [key: string]: string }

let drawObj: number = null
function drawOutline (entity?: number) {
  if (!entity) {
    SetEntityDrawOutline(drawObj, false)
    drawObj = null
  }

  if (drawObj !== entity) {
    SetEntityDrawOutline(drawObj, false)
    drawObj = entity
  }

  if (!IsEntityAnObject(entity)) return // causes crash otherwise

  SetEntityDrawOutlineShader(1)
  SetEntityDrawOutlineColor(255, 255, 255, 255)
  SetEntityDrawOutline(drawObj, true)
}

RegisterCommand('aimObj', () => {
  setTick(() => {
    const [_, entity] = GetEntityPlayerIsFreeAimingAt(PlayerId())
    if (!entity) return drawOutline()
    const [x, y, z] = GetEntityCoords(entity, true)

    drawOutline(entity)

    // get object name
    const hash = GetEntityModel(entity)
    const [onScreen, x2, y2] = GetScreenCoordFromWorldCoord(x, y, z + 1.5)
    if (!onScreen) return
    SetTextFont(0)
    SetTextScale(0.0, 0.5)
    SetTextColour(255, 255, 255, 255)
    SetTextOutline()
    SetTextCentre(true)
    SetTextEntry('STRING')
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
