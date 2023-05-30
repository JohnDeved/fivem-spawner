console.log("[spawner] Server Resource Started")

// spawn vehicle fivem command with default parameters
RegisterCommand('car', (source: string, args: [model: string, id: string]) => {
  const [model = "adder", id = source] = args

  const playerPed = GetPlayerPed(id)
  const playerCoords = GetEntityCoords(playerPed)
  const playerHeading = GetEntityHeading(playerPed)

  const vehicle = CreateVehicle(GetHashKey(model), playerCoords[0], playerCoords[1], playerCoords[2], playerHeading, true, true)
  SetPedIntoVehicle(playerPed, vehicle, -1)
}, false)

// give weapon fivem command with default parameters
RegisterCommand('weapon', (source: string, args: [weapon: string, id: string]) => {
  const [weapon = "weapon_pistol", id = source] = args
  GiveWeaponToPed(GetPlayerPed(id), GetHashKey(weapon), 9999, false, false)

  // add suppressor to weapon
  if (weapon === "weapon_pistol") {
    GiveWeaponComponentToPed(GetPlayerPed(id), GetHashKey(weapon), GetHashKey("COMPONENT_AT_PI_SUPP_02"))
  }
}, false)

RegisterCommand('bring', (source: number, [id]: string[]) => {
  const ped = GetPlayerPed(id)
  if (!ped) return console.log("[spawner] Player not found with id:", id)
  const [x, y, z] = GetEntityCoords(GetPlayerPed(String(source)))
  SetEntityCoords(ped, x, y, z, false, false, false, false)
}, false)

// goto
RegisterCommand('goto', (source: number, [id]: string[]) => {
  const ped = GetPlayerPed(id)
  if (!ped) return console.log("[spawner] Player not found with id:", id)
  const [x, y, z] = GetEntityCoords(ped)
  SetEntityCoords(GetPlayerPed(String(source)), x, y, z, false, false, false, false)
}, false)


// list all players with name and id
RegisterCommand('list', () => {
  const players = getPlayers()
  console.log(players.map(id => `${id} - ${GetPlayerName(id)}`).join("\n"))
}, false)