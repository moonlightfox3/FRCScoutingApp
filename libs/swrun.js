// Externally set config
let onSwReady = () => {}

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
    onSwReady()
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
