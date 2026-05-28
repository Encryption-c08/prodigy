// Not sure if this actually works lmao, it does change though

(async () => {
    const map = Boot?.prototype?.game?.state?._current?._currentScene
        ?.container?.sourceContainer?._bindingDictionary?._map;

    const zone = map?.get("Zone")?.[0]?.cache;
    const qm   = map?.get("QuestManager")?.[0]?.cache;
    if (!zone || !qm) return alert('Error: Zone or QuestManager not found.');

    const data = await qm._getDataPromise;
    const questData = [...data.active.values()][0];

    const currentID = zone.getCurrentQuestID();
    const maxID     = Math.max(...questData.tasks.map(t => parseInt(t.id.split("-")[0])));

    const input = prompt(
        `Current quest chapter: ${currentID}\nMax chapter: ${maxID}\n\nEnter chapter to advance to (blank = current):`
    );
    if (input === null) return;

    const target = input.trim() === '' ? currentID : parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > maxID)
        return alert(`Invalid. Enter 1–${maxID}.`);

    const forceComplete = (id) => {
        const Y = zone.getQuestState() ?? {};
        if (!Y.req) {
            Y.ID  = id;
            Y.req = { type: 'clear', N: 0 };
            Y.state = {};
            zone.setState("quest", Y);
        }
        return zone.completeQuest(id);
    };

    let current = zone.getCurrentQuestID();
    let completed = 0;

    while (current <= target) {
        const ok = forceComplete(current);
        if (!ok) { alert(`Failed at chapter ${current}. Stopped after ${completed} completed.`); return; }
        completed++;
        current = zone.getCurrentQuestID();
        if (current > target) break;
    }

    alert(`Done! Completed ${completed} chapter(s). Now on chapter ${zone.getCurrentQuestID()}.`);
})();
