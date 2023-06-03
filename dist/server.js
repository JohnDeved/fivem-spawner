// server/server.ts
console.log("[spawner] Server Resource Started");
RegisterCommand("car", (source, args) => {
  const [model = "adder", id = source] = args;
  const playerPed = GetPlayerPed(id);
  const playerCoords = GetEntityCoords(playerPed);
  const playerHeading = GetEntityHeading(playerPed);
  const vehicle = CreateVehicle(GetHashKey(model), playerCoords[0], playerCoords[1], playerCoords[2], playerHeading, true, true);
  SetPedIntoVehicle(playerPed, vehicle, -1);
}, false);
RegisterCommand("weapon", (source, args) => {
  const [weapon = "weapon_pistol", id = source] = args;
  GiveWeaponToPed(GetPlayerPed(id), GetHashKey(weapon), 9999, false, false);
  if (weapon === "weapon_pistol") {
    GiveWeaponComponentToPed(GetPlayerPed(id), GetHashKey(weapon), GetHashKey("COMPONENT_AT_PI_SUPP_02"));
  }
}, false);
RegisterCommand("bring", (source, [id]) => {
  const ped = GetPlayerPed(id);
  if (!ped)
    return console.log("[spawner] Player not found with id:", id);
  const [x, y, z] = GetEntityCoords(GetPlayerPed(String(source)));
  SetEntityCoords(ped, x, y, z, false, false, false, false);
}, false);
RegisterCommand("goto", (source, [id]) => {
  const ped = GetPlayerPed(id);
  if (!ped)
    return console.log("[spawner] Player not found with id:", id);
  const [x, y, z] = GetEntityCoords(ped);
  SetEntityCoords(GetPlayerPed(String(source)), x, y, z, false, false, false, false);
}, false);
RegisterCommand("list", () => {
  const players = getPlayers();
  console.log(players.map((id) => `${id} - ${GetPlayerName(id)}`).join("\n"));
}, false);
