// Register service worker
let swRegistration = null
async function registerServiceWorker () {
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
addEventListener("load", function () {
    registerServiceWorker()
    if (!!parseInt(localStorage.getItem("FRCScoutingApp_lightMode"))) document.body.classList.add("light")
})
async function unregisterServiceWorker () {
    await swRegistration.unregister()
}

// Get service worker from registration
function getSw () {
    return swRegistration?.active ?? swRegistration?.waiting ?? swRegistration?.installing
}
