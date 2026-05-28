Ig ill update some stuff here and there

## Features:

✅ indicates fixed, should-be working features<br>
⚙️ indicates features to be fixed soon (currently none)<br>
⚠️ indicates semi-working ("to an extent") features<br>
❌ indicates unfixed features<br>

- ✅ **Get Gold**
- ✅ **Set User Level**
- ✅ **Unlock All Items (Unlock All Furniture Included)**
- ✅ **Unlock All Pets**
- ❌ **Health Hack (Player)**
- ⚠️ **Free Membership** ( seems to be visual only now )
- ⚠️ **Get and Use Magic Coins** ( seems to be visual only now )
- ❌ **Set Grade**
- ✅ **Set Tower**
- ✅ **Walk Anywhere**
- ✅ **Set Walk Speed**
- ❌ **Unlimited Damage**
- ❌ **Unlimited Health**
- ❌ **Fill Energy**
- ✅ **Unlimited Spins**
- ❌ **Reset Account**
- ❌ **Skip Tutorial**
- ❌ **Spam Effects On People**
- ❌ **Morph Forever**

### How did you make this???



Player data   
```js
Boot.prototype.game._state._current.user.source
```

Player display object (sprite/movement)
```js
Boot.prototype.game._state._current.user
```

Current scene/state
```js
Boot.prototype.game._state._current
```

All zones
```js
Boot.prototype.game._state._current._world.zones
```

Current zone
```js
Boot.prototype.game._state._current.zone
```

World object
```js
Boot.prototype.game._state._current._world
```

Walkspeed
```js
Boot.prototype.game._state._current.user.speed
Boot.prototype.game._state._current.user.walkSpeed
Boot.prototype.game._state._current.user.locomotion.speed
```

Walking grid (the area the player can walk)
```js
Boot.prototype.game._state._current.user.locomotion.screen.area
```

Game database (all items, pets, etc.)
```js
Boot.prototype.game._state._states.get("Boot")._gameData
```

JWT token
```js
sessionStorage.getItem("JWT_TOKEN")
```

### Will it ever be open-source?

- Yeah, I plan to decompile and edit the original repos code.

### Why isn't there any answer cheats?

- Eh idk, maybe in the future lol
  
### WHY DOESN'T THIS WORK ON PRODIGY ENGLISH???

- Because this is for the Math version of Prodigy!

#### I am not responsible for your actions with these cheats.

## How To Use:

- Simply open the file that sounds more interesting, click the "Raw" button, then copy the code (or just click the copy button) and paste it into the Chrome console when you're on Prodigy. (may need to type "allow pasting" first)

- Alternitavely, you can try the javascript URL method (putting javascript:thecodehere in the URL box and clicking Enter), if that doesn't work it's likely due to JavaScript not being allowed in Chrome. To allow JavaScript in Google Chrome:
  - At the top right of the Chrome app, click the three dots and choose Settings.
  - In the left sidebar, click Privacy and security, then Site settings.
  - Under Content, select JavaScript.
  - Choose Sites can use JavaScript as the default behavior.

<h3 align="left">Made With JavaScript:</h3>
<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>
