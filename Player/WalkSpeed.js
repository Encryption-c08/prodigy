(async () => {
  const input = prompt("What do you want your walkspeed to be? (default is 0.25)");
  if (input === null) return;

  const speed = Number(input);
  if (!isFinite(speed)) return alert("Not a valid number.");

  try {
    const user = Boot.prototype.game._state._current.user;
    user.speed = speed;
    if (user.locomotion) user.locomotion.speed = speed;
    if (user.walkSpeed !== undefined) user.walkSpeed = speed;

    alert(`Walkspeed set to ${speed}.`);
  } catch (e) {
    console.error(e);
    alert("Error: Check console.");
  }
})();
