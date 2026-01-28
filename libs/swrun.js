// Service worker messaging
const broadcast = new BroadcastChannel("cl_sw-comms")
broadcast.onmessage = function (ev) {
    console.debug(`Got message: '${ev.data.type}'`)

    if (ev.data.type == "github") {
        commitId = ev.data.msg.commitId
        commitDate = ev.data.msg.commitDate
        deployedToPages = ev.data.msg.deployedToPages
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
    if (commitId != null) updateDateEl.innerText = `Commit ${commitId} (${commitDate})${deployedToPages ? "" : " - Updated content available soon"}`
    else updateDateEl.innerText = "Failed to check GitHub. App may be loaded from your browser's offline cache"
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
    
    // Service worker setup
    await registerSw()
    broadcast.postMessage({id: "reload"})
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
