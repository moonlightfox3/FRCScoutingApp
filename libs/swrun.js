// Register
let sw = null
async function registerServiceWorker () {
    if (!("serviceWorker" in navigator)) return console.debug("Could not register service worker")
    
    try {
        sw = await navigator.serviceWorker.register("/FRCScoutingApp/sw.js", {scope: "/"})
        console.debug("Registered service worker")
    } catch (er) {
        console.debug("Error while registering service worker")
    }
}
