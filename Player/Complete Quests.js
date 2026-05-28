(async () => {
    const world = Boot.prototype.game._state._current._world;
    const zones = world.zones;

    const results = [];

    for (const [zoneName, zone] of Object.entries(zones)) {
        const questKeys = Object.keys(zone.quests).map(Number);
        if (questKeys.length === 0) continue;

        const maxID = Math.max(...questKeys);
        let current = zone.getCurrentQuestID();
        let completed = 0;

        while (current <= maxID) {
            const Y = zone.getQuestState() ?? {};
            if (!Y.req) {
                Y.ID    = current;
                Y.req   = { type: 'clear', N: 0 };
                Y.state = {};
                zone.setState("quest", Y);
            }
            const ok = zone.completeQuest(current);
            if (!ok) break;
            completed++;
            const next = zone.getCurrentQuestID();
            if (next <= current) break;
            current = next;
        }

        if (completed > 0) {
            results.push(`[${zoneName}] Completed ${completed} chapter(s) (up to chapter ${maxID})`);
        } else {
            results.push(`[${zoneName}] Already complete or skipped`);
        }
    }

    alert("Results:\n\n" + results.join("\n"));
})();
