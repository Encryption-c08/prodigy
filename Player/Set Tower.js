"use strict";

(async () => {

  function getPlayer() {
    return Boot?.prototype?.game?._state?._current?.user?.source ?? null;
  }

  const player = getPlayer();
  if (!player) {
    return alert("Player not found.");
  }

  const targetLevel = parseInt(
    prompt("What tower level do you want to have? (x >= 0)"),
    10
  );

  if (!Number.isFinite(targetLevel) || Number.isNaN(targetLevel) || targetLevel < 0) {
    return alert("Invalid choice — must be a whole number >= 0.");
  }

  player.completeTower(targetLevel);
  player.addWin();

})();
