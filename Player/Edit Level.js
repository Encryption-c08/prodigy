"use strict";

(async () => {

  function getBindingMap() {
    return Boot?.prototype?.game?.state?._current?._currentScene
      ?.container?.sourceContainer?._bindingDictionary?._map;
  }

  function getPlayer() {
    try {
      const player = getBindingMap()
        ?.get("MainPlayerGameObject")?.[0]
        ?.cache?._components?.[18]
        ?._playerProvider?._player;
      if (player) return player;
    } catch {}

    try {
      const player = Boot?.prototype?.game?._state?._current
        ?._loggedInPlayerDataProvider?._player;
      if (player) return player;
    } catch {}

    return null;
  }

  function decodeJwtPayload(token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  const player    = getPlayer();
  const jwtToken  = sessionStorage.getItem("JWT_TOKEN")?.replace(/^Bearer\s+/, "");
  const jwtUserId = jwtToken ? decodeJwtPayload(jwtToken).content.userID : null;

  if (!player)                 return alert("Player not found.");
  if (!jwtToken || !jwtUserId) return alert("JWT token missing or invalid.");

  const targetLevel = parseInt(prompt("What do you want your level to be?"), 10);
  const maxLevel    = player.currentMaxLevel;

  if (!Number.isFinite(targetLevel) || Number.isNaN(targetLevel) || targetLevel > maxLevel) {
    return alert(`Invalid choice — must be ≤ ${maxLevel}.`);
  }

  player.data.level = targetLevel;
  player.addWin();

  const payload = {
    scriptName: "character.update",
    params: {
      data:   player.getPlayerData(),
      userID: jwtUserId,
    },
    clientID: "1",
    userID:   jwtUserId.toString(),
  };

  const response = await fetch(
    "https://api.prodigygame.com/game-cortex-server/v2/cloudscripts.execute",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payload),
    }
  );

  console.log(await response.json());

})();
