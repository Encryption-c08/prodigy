(function () {
  const map = Boot?.prototype?.game?.state?._current?._currentScene
    ?.container?.sourceContainer?._bindingDictionary?._map;
  const player = map?.get('MainPlayerGameObject')?.[0]
    ?.cache?._components?.[18]?._playerProvider?._player ?? null;

  if (!player) {
    alert("Player object not found.");
    return;
  }

  let amount = NaN;
  try {
    const input = prompt("How much gold do you want?");
    if (input == null) return;
    amount = parseInt(input.replaceAll(",", ""), 10);
  } catch { amount = NaN; }

  if (!Number.isFinite(amount) || Number.isNaN(amount)) {
    alert("That's not a valid number.");
    return;
  }

  player.data = player.data || {};
  player.data.gold = amount;

  const jwtToken = sessionStorage.getItem("JWT_TOKEN")?.replace(/^Bearer\s+/, "");
  if (!jwtToken) {
    alert("JWT token not found.");
    return;
  }

  fetch("https://api.prodigygame.com/game-cortex-server/v2/cloudscripts.execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      scriptName: "character.update",
      params: {
        data: player.getPlayerData(),
        userID: player.userID,
      },
      clientID: "1",
      userID: player.userID.toString(),
    }),
  })
    .then(r => r.json())
    .then(res => {
      if (res.status === 200) {
        alert(`Gold set to ${amount.toLocaleString()}.`);
      } else {
        console.error("Save response:", res);
        alert(`Server responded with status ${res.status}.`);
      }
    })
    .catch(err => {
      console.error("Save failed:", err);
      alert("Network error while saving.");
    });
})();
