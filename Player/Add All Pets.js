"use strict";
(async () => {
  
  const genUID = (len = 21) => {
    const bytes = crypto.getRandomValues(new Uint8Array(len));
    return bytes.reduce((acc, b) => {
      b &= 63;
      if (b < 36)       acc += b.toString(36);
      else if (b < 62)  acc += (b - 26).toString(36).toUpperCase();
      else              acc += b > 62 ? "-" : "_";
      return acc;
    }, "");
  };

  const genUUID = () => {
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = n => n.toString(16).padStart(2, "0");
    return `${h(b[0])}${h(b[1])}${h(b[2])}${h(b[3])}-${h(b[4])}${h(b[5])}-${h(b[6])}${h(b[7])}-${h(b[8])}${h(b[9])}-${h(b[10])}${h(b[11])}${h(b[12])}${h(b[13])}${h(b[14])}${h(b[15])}`;
  };

  const jwtToken = sessionStorage.getItem("JWT_TOKEN")?.replace(/^Bearer\s+/, "");
  const decodeJWT = tok => JSON.parse(atob(tok.split(".")[1]));

  const player = Boot.prototype.game._state._current.user.source;
  if (!player)    return alert("Player not found.");
  if (!jwtToken)  return alert("JWT token missing.");

  const userID = decodeJWT(jwtToken).content.userID;
  if (!userID)    return alert("Could not read userID from JWT.");

  const now       = Date.now();
  const petDefs   = Boot.prototype.game._state._states.get("Boot")._gameData.pet;
  const targetLvl = parseInt(prompt("What level should all pets be?"), 10) || 100;
  
  const buildLegacyPets = () =>
    petDefs.map(p => ({
      levelCaught: player.data.level,
      ID:          p.ID,
      stars:       9999,
      catchDate:   now,
      level:       targetLvl,
      hp:          Number.MAX_SAFE_INTEGER,
      uniqueID:    genUID()
    }));

  const buildKennelPets = () =>
    petDefs.map(p => ({
      id: {
        type: "pet",
        id:   p.ID,
        uuid: genUUID()
      },
      data: {
        levelCaught:            player.data.level,
        ID:                     p.ID,
        stars:                  9999,
        catchDate:              now,
        level:                  targetLvl,
        nextLevelProgressPercent: 0,
        mergeRank:              0,
        team:                   0,
        statGrowth:             "statsUnc",
        stats:                  p.data.stats,
        hp:                     Number.MAX_SAFE_INTEGER,
        gear:                   {},
        uniqueID:               genUID()
      }
    }));

  const buildEncounters = () =>
    petDefs.map(p => ({
      firstSeenDate: now,
      ID:            p.ID,
      timesBattled:  1,
      timesRescued:  1
    }));

  const legacyPets  = buildLegacyPets();
  const kennelPets  = buildKennelPets();
  const encounters  = buildEncounters();
  const encounterPayload = { ads: [], offers: [], pets: encounters };

  const apiPost = body =>
    fetch("https://api.prodigygame.com/game-cortex-server/v2/cloudscripts.execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  "Bearer " + jwtToken
      },
      body: JSON.stringify({
        ...body,
        clientID: "1",
        userID:   userID.toString()
      })
    }).then(r => r.json());

  await apiPost({
    scriptName: "character.update",
    params: {
      data: {
        pets:       legacyPets,
        data:       player.getPlayerData(),
        encounters: encounterPayload
      },
      userID
    }
  });

  for (const pet of legacyPets) {
    await apiPost({
      scriptName: "kennel.unsecureAdd",
      params:     { data: pet },
      requestID:  genUUID()
    });
  }

  await apiPost({
    scriptName: "kennel.update",
    params: {
      update: kennelPets
    },
    requestID: genUUID()
  });

  alert(`Done. ${legacyPets.length} pets added at level ${targetLvl}.`);
})();
