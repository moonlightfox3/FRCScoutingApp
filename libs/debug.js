// Debug mode
let isDebugMode = false
function debugMode (isDebug, store = true, apply = true) {
    if (isDebugMode == isDebug) return
    isDebugMode = isDebug
    
    if (store) {
        // Save
        if (isDebugMode) localStorage.setItem("FRCScoutingApp_debugMode", "1")
        else localStorage.removeItem("FRCScoutingApp_debugMode")
    }
    onApplyDebugMode(apply)
}
function onApplyDebugMode (apply = true) {
    if (apply) {
        // Apply to document
        if (isDebugMode) document.body.classList.add("debug")
        else document.body.classList.remove("debug")

        // Save to worker
        broadcast.postMessage({sender: "cl", type: "debug", msg: {isDebugMode}})
    }

    if (isDebugMode) {
        for (let log of storedDebugLogs) console.debug(...log)
        storedDebugLogs = []
    }
    log(`Debug mode: ${isDebugMode}`)
}

// Debug logging
let storedDebugLogs = []
function log (...args) {
    if (isDebugMode) console.debug(`(${Date.now()})`, ...args)
    else storedDebugLogs.push([`(${Date.now()})`, ...args])
}
