initDataFile(/* PLACEHOLDER */ 0)
setKeyVars(0)

handleKey = function (key) {
    if (key == keys.switchStageTeleop) matchStageIsTeleopKeyboard = true
    else if (key == keys.switchStageAuto) matchStageIsTeleopKeyboard = false
    else if (key == keys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == keys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == keys.focusNotesField) invertKeysKeyboard ? matchNum.focus() : notes.focus()
    /* PLACEHOLDER */
    else if (key == keys.defenseResistance_None) resistDefNone.checked = true
    else if (key == keys.defenseResistance_Weak) resistDefWeak.checked = true
    else if (key == keys.defenseResistance_Strong) resistDefStrong.checked = true
    else if (key == keys.playingDefenseType_None) playDefNone.checked = true
    else if (key == keys.playingDefenseType_Passive) playDefPassive.checked = true
    else if (key == keys.playingDefenseType_Active) playDefActive.checked = true
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
    else if (key == keys.endType_Park) invertKeysKeyboard ? endPosFail.checked = true : endPosPark.checked = true
    /* PLACEHOLDER */

    else return false
    return true
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.switchStageTeleop) matchStageIsTeleopGamepad = true
    else if (key == gamepadKeys.switchStageAuto) matchStageIsTeleopGamepad = false
    else if (key == gamepadKeys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == gamepadKeys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == gamepadKeys.focusNotesField) {
        if (invertKeysGamepad) {
            if (document.activeElement == matchNum) teamNum.focus()
            else matchNum.focus()
        } else {
            if (document.activeElement == notes) notes.blur()
            else notes.focus()
        }
    }
    /* PLACEHOLDER */

    else return false
    return true
}
