initDataFile(2025)
setKeyVars(2025)

handleKey = function (key) {
    if (key == keys.switchStage_Teleop) matchStageIsTeleopKeyboard = true
    else if (key == keys.switchStage_Auto) matchStageIsTeleopKeyboard = false
    else if (key == keys.toggleRobotCame) robotCame.checked = !robotCame.checked
    else if (key == keys.toggleRobotAutoLeftStart) autoPastLine.checked = !autoPastLine.checked
    else if (key == keys.focusNotesField) invertKeysKeyboard ? matchNum.focus() : notes.focus()
    else if (key == keys.coralL1Hit) modifyInputValueKeyboard(opCoralL1, autoCoralL1)
    else if (key == keys.coralL2Hit) modifyInputValueKeyboard(opCoralL2, autoCoralL2)
    else if (key == keys.coralL3Hit) modifyInputValueKeyboard(opCoralL3, autoCoralL3)
    else if (key == keys.coralL4Hit) modifyInputValueKeyboard(opCoralL4, autoCoralL4)
    else if (key == keys.coralL1Miss) modifyInputValueKeyboard(opCoralL1Miss, autoCoralL1Miss)
    else if (key == keys.coralL2Miss) modifyInputValueKeyboard(opCoralL2Miss, autoCoralL2Miss)
    else if (key == keys.coralL3Miss) modifyInputValueKeyboard(opCoralL3Miss, autoCoralL3Miss)
    else if (key == keys.coralL4Miss) modifyInputValueKeyboard(opCoralL4Miss, autoCoralL4Miss)
    else if (key == keys.algaeProcessorHit) modifyInputValueKeyboard(opAlgaeProc, autoAlgaeProc)
    else if (key == keys.algaeNetHit) modifyInputValueKeyboard(opAlgaeNet, autoAlgaeNet)
    else if (key == keys.algaeDescoreHit) modifyInputValueKeyboard(opAlgaeDesc, autoAlgaeDesc)
    else if (key == keys.algaeProcessorMiss) modifyInputValueKeyboard(opAlgaeProcMiss, autoAlgaeProcMiss)
    else if (key == keys.algaeNetMiss) modifyInputValueKeyboard(opAlgaeNetMiss, autoAlgaeNetMiss)
    else if (key == keys.algaeDescoreMiss) modifyInputValueKeyboard(opAlgaeDescMiss, autoAlgaeDescMiss)
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
    else if (key == keys.endType_Deep) invertKeysKeyboard ? endPosDeepFail.checked = true : endPosDeep.checked = true
    else if (key == keys.endType_Shallow) invertKeysKeyboard ? endPosShallowFail.checked = true : endPosShallow.checked = true

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
    } else if (key == gamepadKeys.coralL1) modifyInputValueGamepad(opCoralL1, opCoralL1Miss, autoCoralL1, autoCoralL1Miss)
    else if (key == gamepadKeys.coralL2) modifyInputValueGamepad(opCoralL2, opCoralL2Miss, autoCoralL2, autoCoralL2Miss)
    else if (key == gamepadKeys.coralL3) modifyInputValueGamepad(opCoralL3, opCoralL3Miss, autoCoralL3, autoCoralL3Miss)
    else if (key == gamepadKeys.coralL4) modifyInputValueGamepad(opCoralL4, opCoralL4Miss, autoCoralL4, autoCoralL4Miss)
    else if (key == gamepadKeys.algaeProcessor) modifyInputValueGamepad(opAlgaeProc, opAlgaeProcMiss, autoAlgaeProc, autoAlgaeProcMiss)
    else if (key == gamepadKeys.algaeNet) modifyInputValueGamepad(opAlgaeNet, opAlgaeNetMiss, autoAlgaeNet, autoAlgaeNetMiss)
    else if (key == gamepadKeys.algaeDescore) modifyInputValueGamepad(opAlgaeDesc, opAlgaeDescMiss, autoAlgaeDesc, autoAlgaeDescMiss)

    else return false
    return true
}
