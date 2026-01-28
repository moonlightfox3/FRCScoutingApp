initDataFile(/* PLACEHOLDER */ 0, false)
setKeyVars(0, false)

handleKey = function (key) {
    if (key == keys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == keys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == keys.focusNotesField) invertKeysKeyboard ? teamNum.focus() : notes.focus()
    /* PLACEHOLDER */
    else if (key == keys.defenseResistance_None) resistDefNone.selected = true
    else if (key == keys.defenseResistance_Weak) resistDefWeak.selected = true
    else if (key == keys.defenseResistance_Strong) resistDefStrong.selected = true
    else if (key == keys.playingDefenseType_None) playDefNone.selected = true
    else if (key == keys.playingDefenseType_Passive) playDefPassive.selected = true
    else if (key == keys.playingDefenseType_Active) playDefActive.selected = true
    else if (key == keys.playingDefenseStrength_VeryWeak) playDefStrenVWeak.selected = true
    else if (key == keys.playingDefenseStrength_Weak) playDefStrenWeak.selected = true
    else if (key == keys.playingDefenseStrength_Average) playDefStrenAvg.selected = true
    else if (key == keys.playingDefenseStrength_Strong) playDefStrenStrong.selected = true
    else if (key == keys.playingDefenseStrength_VeryStrong) playDefStrenVStrong.selected = true
    else if (key == keys.playingDefenseStrength_None) playDefStrenNone.selected = true
    else if (key == keys.secondsBroken_1To10) breakSec10.selected = true
    else if (key == keys.secondsBroken_11To30) breakSec30.selected = true
    else if (key == keys.secondsBroken_31To60) breakSec60.selected = true
    else if (key == keys.secondsBroken_Over60) breakSecMore.selected = true
    else if (key == keys.secondsBroken_None) breakSecNone.selected = true
    else if (key == keys.endType_Park) invertKeysKeyboard ? endPosFail.selected = true : endPosPark.selected = true
    /* PLACEHOLDER */

    else return false
    return true
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == gamepadKeys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == gamepadKeys.focusNotesField) {
        if (invertKeysGamepad) {
            if (document.activeElement == teamNum) matchNum.focus()
            else teamNum.focus()
        } else {
            if (document.activeElement == notes) notes.blur()
            else notes.focus()
        }
    }
    /* PLACEHOLDER */

    else return false
    return true
}
