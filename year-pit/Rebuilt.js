initDataFile(2026, true)
setKeyVars(2026, true)

let scoreBy10Keyboard = false
let scoreBy10Gamepad = false
handleKey = function (key) {
    if (key == keys.toggleGetFuelFromFloor) pickFuelFloor.checked = !pickFuelFloor.checked
    else if (key == keys.toggleCanCrossBump) throughBump.checked = !throughBump.checked
    else if (key == keys.toggleCanGoThroughTrench) throughTrench.checked = !throughTrench.checked
    else if (key == keys.focusOwnNotesField) matchStageIsTeleopKeyboard ? opNotes.focus() : autoNotes.focus()
    else if (key == keys.focusNotesField) invertKeysKeyboard ? teamNum.focus() : notes.focus()
    else if (key == keys.fuelCapacity) modifyInputValueKeyboard(fuelCount, fuelCount, scoreBy10Keyboard ? 10 : 1)
    else if (key == keys.scoreBy10) scoreBy10Keyboard = true
    else if (key == keys.climbHeight) modifyInputValueKeyboard(opClimb, autoClimb)

    else return false
    return true
}
handleKeyUp = function (key) {
    if (key == keys.scoreBy10) scoreBy10Keyboard = false
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.toggleGetFuelFromFloor) pickFuelFloor.checked = !pickFuelFloor.checked
    else if (key == gamepadKeys.toggleCanCrossBump) throughBump.checked = !throughBump.checked
    else if (key == gamepadKeys.toggleCanGoThroughTrench) throughTrench.checked = !throughTrench.checked
    else if (key == gamepadKeys.focusOwnNotesField) {
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
    else if (key == gamepadKeys.fuelCapacity) modifyInputValueGamepad(fuelCount, fuelCount, fuelCount, fuelCount, scoreBy10Gamepad ? 10 : 1)
    else if (key == gamepadKeys.scoreBy10) scoreBy10Gamepad = true
    else if (key == gamepadKeys.climbHeight) modifyInputValueGamepad(opClimb, opClimb, autoClimb, autoClimb)

    else return false
    return true
}
handleKeyUpGamepad = function (key) {
    if (key == gamepadKeys.scoreBy10) scoreBy10Gamepad = false
}
