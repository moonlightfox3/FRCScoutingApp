initDataFile(2026, false)
setKeyVars(2026, false)

let scoreBy10Keyboard = false
let scoreBy10Gamepad = false
handleKey = function (key) {
    if (key == keys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == keys.toggleGetFuelFromFloor) pickFuelFloor.checked = !pickFuelFloor.checked
    else if (key == keys.toggleCanCrossBump) throughBump.checked = !throughBump.checked
    else if (key == keys.toggleCanGoThroughTrench) throughTrench.checked = !throughTrench.checked
    else if (key == keys.focusOwnNotesField) matchStageIsTeleopKeyboard ? null : autoNotes.focus()
    else if (key == keys.focusNotesField) invertKeysKeyboard ? teamNum.focus() : notes.focus()
    else if (key == keys.focusTeleopActiveBehavior) opActiveBehavior.focus()
    else if (key == keys.focusTeleopInactiveBehavior) opInactiveBehavior.focus()
    else if (key == keys.focusSecondsBrokenCause) breakCause.focus()
    else if (key == keys.scoreBy10) scoreBy10Keyboard = true
    else if (key == keys.fuelShotWhenInactive) modifyInputValueKeyboard(opInactiveShots, null, scoreBy10Keyboard ? 10 : 1)
    else if (key == keys.climbHeight) modifyInputValueKeyboard(opClimb, autoClimb)
    else if (key == keys.fuelShot) modifyInputValueKeyboard(opBurstSize, autoShots, scoreBy10Keyboard ? 10 : 1)
    else if (key == keys.fuelMissed) modifyInputValueKeyboard(opBurstMisses, autoMisses, scoreBy10Keyboard ? 10 : 1)
    else if (key == keys.teleopCycleTime_1To3) opCycleTime3.checked = true
    else if (key == keys.teleopCycleTime_4To6) opCycleTime6.checked = true
    else if (key == keys.teleopCycleTime_7To10) opCycleTime10.checked = true
    else if (key == keys.teleopCycleTime_Over10) opCycleTimeMore.checked = true
    else if (key == keys.playingDefenseStrength_VeryWeak) playDefStrenVWeak.checked = true
    else if (key == keys.playingDefenseStrength_Weak) playDefStrenWeak.checked = true
    else if (key == keys.playingDefenseStrength_Average) playDefStrenAvg.checked = true
    else if (key == keys.playingDefenseStrength_Strong) playDefStrenStrong.checked = true
    else if (key == keys.playingDefenseStrength_VeryStrong) playDefStrenVStrong.checked = true
    else if (key == keys.playingDefenseStrength_None) playDefStrenNone.checked = true
    else if (key == keys.secondsBroken_1To10) breakSec10.checked = true
    else if (key == keys.secondsBroken_11To30) breakSec30.checked = true
    else if (key == keys.secondsBroken_31To60) breakSec60.checked = true
    else if (key == keys.secondsBroken_Over60) breakSecMore.checked = true
    else if (key == keys.secondsBroken_None) breakSecNone.checked = true

    else return false
    return true
}
handleKeyUp = function (key) {
    if (key == keys.scoreBy10) scoreBy10Keyboard = false
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == gamepadKeys.focusOwnNotesField) {
        if (!matchStageIsTeleopGamepad) {
            if (document.activeElement == autoNotes) autoNotes.blur()
            else autoNotes.focus()
        }
    } else if (key == gamepadKeys.focusNotesField) {
        if (invertKeysGamepad) {
            if (document.activeElement == teamNum) matchNum.focus()
            else teamNum.focus()
        } else {
            if (document.activeElement == notes) notes.blur()
            else notes.focus()
        }
    }
    else if (key == gamepadKeys.focusTeleopActiveBehavior) document.activeElement == opActiveBehavior ? opActiveBehavior.blur() : opActiveBehavior.focus()
    else if (key == gamepadKeys.focusTeleopInactiveBehavior) document.activeElement == opInactiveBehavior ? opInactiveBehavior.blur() : opInactiveBehavior.focus()
    else if (key == gamepadKeys.focusSecondsBrokenCause) document.activeElement == breakCause ? breakCause.blur() : breakCause.focus()
    else if (key == gamepadKeys.scoreBy10) scoreBy10Gamepad = true
    else if (key == gamepadKeys.fuelShotWhenInactive) modifyInputValueGamepad(opInactiveShots, opInactiveShots, null, null, scoreBy10Gamepad ? 10 : 1)
    else if (key == gamepadKeys.climbHeight) modifyInputValueGamepad(opClimb, opClimb, autoClimb, autoClimb)
    else if (key == gamepadKeys.fuelShot) modifyInputValueGamepad(opBurstSize, opBurstSize, autoShots, autoShots, scoreBy10Gamepad ? 10 : 1)
    else if (key == gamepadKeys.fuelMissed) modifyInputValueGamepad(opBurstMisses, opBurstMisses, autoMisses, autoMisses, scoreBy10Gamepad ? 10 : 1)

    else return false
    return true
}
handleKeyUpGamepad = function (key) {
    if (key == gamepadKeys.scoreBy10) scoreBy10Gamepad = false
}
