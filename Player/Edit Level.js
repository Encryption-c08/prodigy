"use strict";
(async () => {
  function decodeJwtPayload(token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  const player    = Boot.prototype.game._state._current.user.source;
  const jwtToken  = sessionStorage.getItem("JWT_TOKEN")?.replace(/^Bearer\s+/, "");
  const jwtUserId = jwtToken ? decodeJwtPayload(jwtToken).content.userID : null;

  if (!player)                 return alert("Player not found.");
  if (!jwtToken || !jwtUserId) return alert("JWT token missing or invalid.");

  const targetLevel = parseInt(prompt("What do you want your level to be?"), 10);
  const maxLevel    = player.currentMaxLevel;

  if (!Number.isFinite(targetLevel) || isNaN(targetLevel) || targetLevel > maxLevel) {
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
