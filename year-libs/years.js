console.debug("Loading default year code")

// Externally set config
let keys = null // 'invertAction', 'switchStage_Teleop', 'switchStage_Auto', 'downloadData', and 'saveDataInBrowser' are required here
let gamepadKeys = null // 'invertAction', 'switchStage_Teleop', 'switchStage_Auto', 'downloadData', and 'saveDataInBrowser' are required here. 'scoreMiss' is optional here
let handleKey = key => {}
let handleKeyUp = key => {}
let handleKeyGamepad = key => {}
let handleKeyUpGamepad = key => {}

// Keyboard
let invertKeysKeyboard = false
let matchStageIsTeleopKeyboard = false
onkeydown = function (ev) {
    // Should the key be processed?
    if (keys == null) return
    if (ev.repeat) return
    if (ev.ctrlKey || ev.altKey || ev.metaKey) return

    // Special keys
    let key = ev.key.toLowerCase()
    if (key == "escape") return document.activeElement.blur()
    else if (key == "tab") {
        ev.preventDefault()
        if (document.activeElement == notes) {
            let pos = notes.selectionStart
            notes.value = notes.value.substring(0, pos) + " ".repeat(4) + notes.value.substring(notes.selectionEnd)
            notes.selectionStart = notes.selectionEnd = pos + 4
        } else if (!dataIsPit && document.activeElement == teamNum) matchNum.focus()
        else teamNum.focus()
        return
    }
    // Don't check the key if an input element is focused
    if (document.activeElement?.type == "text" || document.activeElement instanceof UINumberInputElement || document.activeElement instanceof HTMLTextAreaElement) return
    let shouldCancel = true

    // Check the key
    if (key == keys.invertAction) invertKeysKeyboard = true
    else if (key == keys.switchStage_Teleop) matchStageIsTeleopKeyboard = true
    else if (key == keys.switchStage_Auto) matchStageIsTeleopKeyboard = false
    else if (key == keys.downloadData) downloadData()
    else if (key == keys.saveDataInBrowser) saveDataBrowserBtn.click()
    else if (handleKey(key)) null

    // Cancel if needed
    else shouldCancel = false
    if (shouldCancel) ev.preventDefault()
}
onkeyup = function (ev) {
    // Should the key be processed?
    if (keys == null) return

    // Check the key
    let key = ev.key.toLowerCase()
    if (key == keys.invertAction) invertKeysKeyboard = false
    else if (handleKeyUp(key)) null
}
// Helper function for increasing/decreasing number inputs
function modifyInputValueKeyboard (inputTeleop, inputAuto = inputTeleop, amount = 1) {
    let val = invertKeysKeyboard ? -amount : amount
    if (matchStageIsTeleopKeyboard) inputTeleop != null ? inputTeleop.value = parseInt(inputTeleop.value) + val : null
    else inputAuto != null ? inputAuto.value = parseInt(inputAuto.value) + val : null
}

// Gamepad
let invertKeysGamepad = false
let scoreMissGamepad = false
let matchStageIsTeleopGamepad = false
function checkGamepad () {
    // Should the buttons be processed?
    if (gamepadKeys == null) return
    if (!gamepad.cursor.isClickReady) return

    // Check the buttons
    let buttons = gamepad.buttonsNamed
    invertKeysGamepad = buttons[gamepadKeys.invertAction] > 0
    scoreMissGamepad = buttons[gamepadKeys?.scoreMiss] > 0
}
function onGamepadPress (key) {
    // Should the buttons be processed?
    if (gamepadKeys == null) return
    if (!gamepad.cursor.isClickReady) return
    
    // Check the buttons
    if (key == gamepadKeys.switchStage_Teleop) matchStageIsTeleopGamepad = true
    else if (key == gamepadKeys.switchStage_Auto) matchStageIsTeleopGamepad = false
    else if (key == gamepadKeys.downloadData) downloadData()
    else if (key == gamepadKeys.saveDataInBrowser) saveDataBrowserBtn.click()
    else if (handleKeyGamepad(key)) null
}
function onGamepadUnpress (key) {
    // Should the buttons be processed?
    if (gamepadKeys == null) return
    if (!gamepad.cursor.isClickReady) return

    // Check the buttons
    if (handleKeyUpGamepad(key)) null
}
// Helper function for increasing/decreasing number inputs
function modifyInputValueGamepad (inputTeleopHit, inputTeleopMiss = inputTeleopHit, inputAutoHit = inputTeleopHit, inputAutoMiss = inputTeleopMiss, amount = 1) {
    let val = invertKeysGamepad ? -amount : amount
    if (matchStageIsTeleopGamepad) {
        if (scoreMissGamepad) inputTeleopMiss != null ? inputTeleopMiss.value = parseInt(inputTeleopMiss.value) + val : null
        else inputTeleopHit != null ? inputTeleopHit.value = parseInt(inputTeleopHit.value) + val : null
    } else {
        if (scoreMissGamepad) inputAutoMiss != null ? inputAutoMiss.value = parseInt(inputAutoMiss.value) + val : null
        else inputAutoHit != null ? inputAutoHit.value = parseInt(inputAutoHit.value) + val : null
    }
}
// Get the gamepad
gamepadLoopInit(checkGamepad)
gamepadPressListenerInit(onGamepadPress, onGamepadUnpress)

// Form stuff
downloadDataBtn.onclick = () => downloadData()
saveDataBrowserBtn.onclick = () => { saveDataBrowser(); alert("Saved locally!\nPlease download this file or upload it to the server when possible.") }
dataForm.onreset = function () {
    let inputs = dataForm.querySelectorAll("ui-input-number")
    for (let input of inputs) input.reset()
}

// Prompt before leaving the page, if any form element was changed
onbeforeunload = function (ev) {
    if (getFormChanged()) ev.preventDefault()
}
