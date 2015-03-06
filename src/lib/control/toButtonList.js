// Return {read: 1, write: 1, undo: 1, redo: 1, replicate: 1…}
export default function(buttonMap) {
    return buttonMap.buttonGroup
        .reduce((hash, group) => {
            return group.buttonList
                .reduce((hash, button) => {
                    // Trick for merge outer parametr to enable or disable buttons
                    hash[button.buttonType] = 1;
                    return hash;
                }, hash);
        }, {});
}
