(async () => {
  Boot.prototype.game._state._current.user.source.canSpin = function () {
    return true;
  };
})();

// I find it hilarious that the obfuscator makes this tiny ass function 23kb :skull:
