function getPlayerProvider() {
  try {
    const currentState =
      Boot?.prototype?.game?._state?._current;

    const provider =
      currentState?._loggedInPlayerDataProvider;

    if (provider?._player) {
      return provider;
    }
  } catch {}

  try {
    const components =
      Boot?.prototype?.game?.state?._current
        ?._currentScene?.container
        ?.sourceContainer?._bindingDictionary
        ?._map?.get?.("MainPlayerGameObject")?.[0]
        ?.cache?._components;

    if (!components) return null;

    for (const component of components) {
      const provider = component?._playerDataProvider;

      if (provider?._player) {
        return provider;
      }
    }
  } catch {}

  return null;
}

const provider = getPlayerProvider();

if (!provider) {
  console.error("Player provider not found");
} else {

  provider.isMember = () => true;

  const player = provider._player;

  player.data.nm = 3;
  player.memberStartDate = Date.now();
  player.updated = true;
  player.memberPrompt = true;
  
  player.membershipUpsell = {
    tier: 3,
    upgradeOptions: []
  };

  player.processMembershipUpgradeOptions =
    function () {
      return this.membershipUpsell;
    };

  player.hasMembership = () => true;
  player.hasMembershipFeatureAccess = () => true;
  player.getMemberTier = () => 3;
  player.setMembership?.(true);
  player.unlockMemberItems?.();
  player.appearanceChanged = true;
  player.saveEnabled = true;
  player.forceSaveCharacter?.();
  provider.getMembershipUpsell?.();
}
