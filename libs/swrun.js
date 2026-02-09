// Service worker messaging
let didUpdate = null
const broadcast = new BroadcastChannel("cl_sw-comms")
broadcast.onmessage = function (ev) {
    if (ev.data.sender == "cl") return
    console.debug(`Got message: '${ev.data.type}'`)

    if (ev.data.type == "github") {
        commitId = ev.data.msg.commitId
        commitDate = ev.data.msg.commitDate
        deployedToPages = ev.data.msg.deployedToPages
        didUpdate = ev.data.msg.didUpdate
        showCommitUpdate()
    }
}

// Page-specific things related to messaging
let commitId = null
let commitDate = null
let deployedToPages = null
function showCommitUpdate () {
    // Show the update status element
    if (document.querySelector("div#updateDateEl") == null) return
    if (commitId != null) updateDateEl.innerText = `Commit ${commitId} (${commitDate})${deployedToPages ? (didUpdate ? " - Reload app to update" : "") : " - App update available soon"}`
    else updateDateEl.innerText = `Failed to check GitHub. App may be loaded from your browser's offline cache${didUpdate ? ". Reload app to update" : ""}`
}

// Register service worker
let swRegistration = null
async function registerSw () {
    if (!("serviceWorker" in navigator)) return console.debug("Service worker not supported")
    
    try {
        swRegistration = await navigator.serviceWorker.register("/FRCScoutingApp/sw.js", {scope: "/FRCScoutingApp/"})
        await swRegistration.update()
    } catch (er) {
        console.debug("Error while registering service worker")
        return
    }
    console.debug("Registered service worker")
}
addEventListener("load", async function () {
    // Unrelated stuff :3
    if (!!parseInt(localStorage.getItem("FRCScoutingApp_lightMode"))) document.body.classList.add("light")
    console.debug("App loaded")
    
    // Service worker setup
    await registerSw()
    broadcast.postMessage({sender: "cl", type: "reload", msg: {}})
})
async function unregisterSw () {
    try {
        await swRegistration.unregister()
    } catch (er) {}
}

// Get service worker from registration
function getSw () {
    return swRegistration?.active ?? swRegistration?.waiting ?? swRegistration?.installing
}
