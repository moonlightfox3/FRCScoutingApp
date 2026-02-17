// Debug mode
let isDebugMode = false
function debugMode (isDebug, store = true) {
    if (isDebugMode == isDebug) return
    isDebugMode = isDebug
    
    if (store) {
        // Save
        if (isDebugMode) localStorage.setItem("FRCScoutingApp_debugMode", "1")
        else localStorage.removeItem("FRCScoutingApp_debugMode")
    }
    onApplyDebugMode()
}
function onApplyDebugMode () {
    if (isDebugMode) document.body.classList.add("debug")
    else document.body.classList.remove("debug")
    log(`Debug mode: ${isDebugMode}`)
}

// Debug logging
function log (...args) {
    if (isDebugMode) console.debug(...args)
}
