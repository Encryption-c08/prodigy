(async () => {
  try {
    const area = Boot.prototype.game.state._current._currentScene
      .container.sourceContainer._bindingDictionary._map
      .get("Pathfinder")[0].cache._pathfinder.area;

    for (let i = 0; i < area.length; i++) {
      area[i] = Array(64).fill(1);
    }

    console.log("Pathfinder grid unlocked.");
  } catch (e) {
    console.error("Failed:", e.message);
  }
})();
