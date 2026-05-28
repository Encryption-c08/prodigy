(async () => {
  const player = Boot.prototype.game._state._current.user.source;
  if (!player) return console.error("Player not found.");

  player.data.nm = 3;
  player.memberStartDate = Date.now();
  player.updated = true;
  player.memberPrompt = true;

  player.membershipUpsell = {
    tier: 3,
    upgradeOptions: []
  };

  player.processMembershipUpgradeOptions = function () {
    return this.membershipUpsell;
  };

  player.hasMembership                = () => true;
  player.hasMembershipFeatureAccess   = () => true;
  player.getMemberTier                = () => 3;
  player.setMembership?.( true);
  player.unlockMemberItems?.();
  player.appearanceChanged = true;
  player.saveEnabled = true;
  player.forceSaveCharacter?.();
})();
