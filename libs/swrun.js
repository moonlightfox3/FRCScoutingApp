// Register
let sw = null
async function registerServiceWorker () {
    if (!("serviceWorker" in navigator)) return console.debug("Service worker not supported")
    
    try {
        sw = await navigator.serviceWorker.register("/FRCScoutingApp/sw.js", {scope: "/FRCScoutingApp/"})
    } catch (er) {
        console.debug("Error while registering service worker")
        return
    }
    console.debug("Registered service worker")
}
addEventListener("load", () => registerServiceWorker())
