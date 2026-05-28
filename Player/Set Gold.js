(async () => {
    const player = Boot.prototype.game._state._current.user.source;
    if (!player) return alert("Player object not found.");

    const input = prompt("How much gold do you want?");
    if (input == null) return;

    const amount = parseInt(input.replaceAll(",", ""), 10);
    if (!Number.isFinite(amount) || isNaN(amount)) return alert("That's not a valid number.");

    player.data = player.data || {};
    player.data.gold = amount;

    const jwtToken = sessionStorage.getItem("JWT_TOKEN")?.replace(/^Bearer\s+/, "");
    if (!jwtToken) return alert("JWT token not found.");

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
