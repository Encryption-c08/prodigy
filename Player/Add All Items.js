"use strict";

(async () => {

  function buildItemArray(itemList, isCurrency = false) {
    const quantity = isCurrency ? currencyQuantity : itemQuantity;
    return "[" + itemList.map(item => JSON.stringify({
      N: quantity,
      ID: item.ID
    })).join(",") + "]";
  }

  function getBindingMap() {
    return Boot?.prototype?.game?.state
      ?._current?._currentScene
      ?.container?.sourceContainer
      ?._bindingDictionary?._map;
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

  const itemQuantity     = parseInt(prompt("How many of each item?"), 10);
  const currencyQuantity = parseInt(prompt("How much of each currency?"), 10);

  if (!itemQuantity || !currencyQuantity) {
    alert("Unexpected answer.");
    return;
  }

  const player = getPlayer();
  if (!player) return alert("Player not found.");

  const gameDatabase = Boot.prototype.game._state._states.get("Boot")._gameData;
  const backpack = player.backpack.data;

  player.house.data.items = {};
  const dormItemStack = { A: [], N: itemQuantity };

  gameDatabase.dorm.forEach(dormItem => {
    player.house.data.items[dormItem.ID] = dormItemStack;
  });

  backpack.weapon           = JSON.parse(buildItemArray(gameDatabase.weapon));
  backpack.outfit           = JSON.parse(buildItemArray(gameDatabase.outfit));
  backpack.hat              = JSON.parse(buildItemArray(gameDatabase.hat));
  backpack.boots            = JSON.parse(buildItemArray(gameDatabase.boots));
  backpack.relic            = JSON.parse(buildItemArray(gameDatabase.relic));
  backpack.spellRelic       = JSON.parse(buildItemArray(gameDatabase.spellRelic));
  backpack.fossil           = JSON.parse(buildItemArray(gameDatabase.fossil));
  backpack.item             = JSON.parse(buildItemArray(gameDatabase.item));
  backpack.follow           = JSON.parse(buildItemArray(gameDatabase.follow));
  backpack.mount            = JSON.parse(buildItemArray(gameDatabase.mount));
  backpack.mathTownInterior = JSON.parse(buildItemArray(gameDatabase.mathTownInterior));
  backpack.mathTownFrame    = JSON.parse(buildItemArray(gameDatabase.mathTownFrame));
  backpack.key              = JSON.parse(buildItemArray(gameDatabase.key));
  backpack.emote            = JSON.parse(buildItemArray(gameDatabase.emote));
  backpack.currency         = JSON.parse(buildItemArray(gameDatabase.currency, true));

  alert("Done!");

})();
