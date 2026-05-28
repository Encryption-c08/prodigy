(async () => {
  try {
    const area = Boot.prototype.game._state._current.user.locomotion.screen.area;

    if (!area) return alert("Area not found.");

    for (let i = 0; i < area.length; i++) {
      area[i] = Array(64).fill(1);
    }

    alert("Enabled.");
  } catch (e) {
    console.error(e);
    alert("Error: Check console.");
  }
})();
