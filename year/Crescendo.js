initDataFile(2024)
setKeyVars(2024)

handleKey = function (key) {
    if (key == keys.switchStage_Teleop) matchStageIsTeleopKeyboard = true
    else if (key == keys.switchStage_Auto) matchStageIsTeleopKeyboard = false
    else if (key == keys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == keys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == keys.focusNotesField) invertKeysKeyboard ? matchNum.focus() : notes.focus()
    else if (key == keys.spkHit) modifyInputValueKeyboard(opNoteSpk, autoNoteSpk)
    else if (key == keys.ampHit) modifyInputValueKeyboard(opNoteAmp, autoNoteAmp)
    else if (key == keys.spkMiss) modifyInputValueKeyboard(opNoteSpkMiss, autoNoteSpkMiss)
    else if (key == keys.ampMiss) modifyInputValueKeyboard(opNoteAmpMiss, autoNoteAmpMiss)
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
    else if (key == keys.endType_Climb) invertKeysKeyboard ? endPosClimbFail.checked = true : endPosClimb.checked = true

    else return false
    return true
}
handleKeyGamepad = function (key) {
    if (key == gamepadKeys.switchStage_Teleop) matchStageIsTeleopGamepad = true
    else if (key == gamepadKeys.switchStage_Auto) matchStageIsTeleopGamepad = false
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
    } else if (key == gamepadKeys.spk) modifyInputValueGamepad(opNoteSpk, opNoteSpkMiss, autoNoteSpk, autoNoteSpkMiss)
    else if (key == gamepadKeys.amp) modifyInputValueGamepad(opNoteAmp, opNoteAmpMiss, autoNoteAmp, autoNoteAmpMiss)

    else return false
    return true
}
