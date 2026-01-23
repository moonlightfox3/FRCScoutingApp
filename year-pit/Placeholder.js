initDataFile(0, true)
setKeyVars(0, true)

handleKey = function (key) {
    if (key == keys.focusOwnNotesField) matchStageIsTeleopKeyboard ? opNotes.focus() : autoNotes.focus()
    else if (key == keys.focusNotesField) invertKeysKeyboard ? teamNum.focus() : notes.focus()

    else return false
    return true
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.focusOwnNotesField) {
        if (matchStageIsTeleopGamepad) {
            if (document.activeElement == opNotes) opNotes.blur()
            else opNotes.focus()
        } else {
            if (document.activeElement == autoNotes) autoNotes.blur()
            else autoNotes.focus()
        }
    } else if (key == gamepadKeys.focusNotesField) {
        if (invertKeysGamepad) teamNum.focus()
        else {
            if (document.activeElement == notes) notes.blur()
            else notes.focus()
        }
    }

    else return false
    return true
}
