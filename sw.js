// Imports
importScripts("/FRCScoutingApp/libs/github.js")

// Caching
const cachePrefix = "FRCScoutingApp_"
const precacheResources = [ // No need to precache some resources
    "/sw.js", "/index.html",
    "/libs/datafile.js", "/libs/gamepadControl.js", "/libs/gamepads.js", "/libs/github.js", "/libs/install.js", "/libs/profile.js", "/libs/swrun.js", "/libs/style.css",
    "/year/Crescendo.html", "/year/Crescendo.js", "/year/Reefscape.html", "/year/Reefscape.js", "/year/Rebuilt.html", "/year/Rebuilt.js",
    "/year-libs/years.js", "/year-libs/style.css",
]
async function runPrecache () {
    console.debug("[SW] Precaching resources")
    await cache.addAll(precacheResources.map(val => `/FRCScoutingApp${val}`))
}

// Set up the cache
let cacheName = null
let cache = null
async function setupCache () {
    // Find the cache, create one if there isn't one already
    cacheName = `${cachePrefix}${commitId}`
    cache = await caches.open(cacheName)
    cacheCommitId = commitId

    console.debug("[SW] Created cache")
}

// Get the cache
let cacheCommitId = null
async function getCacheData () {
    // Reset variables
    cacheName = null
    cache = null
    cacheCommitId = null

    // Find the cache name (there should only be one)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix))
    if (relevantNames.length > 1) {
        for (let relevantName of relevantNames) await caches.delete(relevantName)
        console.debug("[SW] Too many caches")
        return
    }

    // Make sure a cache exists
    let name = relevantNames[0]
    if (name == null) return console.debug("[SW] No valid cache")

    // Set variables
    cacheCommitId = name.substring(name.indexOf("_") + 1)
    cacheName = `${cachePrefix}${cacheCommitId}`
    cache = await caches.open(cacheName)

    console.debug("[SW] Got cache")
}

// On request
self.addEventListener("fetch", function (ev) {
    // Don't cache some URLs
    if (ev.request.url.includes("github.com")) return

    // Need to do async work
    ev.respondWith((async function () {
        // Make sure cache exists and is up to date
        if (cacheCommitId == null) await getCacheData()
        if (cacheCommitId != commitId && commitId != null) {
            console.debug("[SW] Upgrading cache")
            caches.delete(`${cachePrefix}${cacheCommitId}`) // Still works even if the cache doesn't exist
            setupCache()
        }

        // Check if the response is already cached, return it if it is
        let cachedResp = await caches.match(ev.request)
        if (cachedResp != null) return cachedResp

        // Network stuff, catch fetch errors
        try {
            // Make a request
            let resp = await fetch(ev.request)
            
            // Cache the response (if it's successful), and return it
            if (resp.ok) await cache.put(ev.request, resp)
            return resp
        } catch (er) {
            // Network error
            return Response.error()
        }
    })())
})

// On install - Set up cache
self.addEventListener("install", function (ev) {
    ev.waitUntil((async function () {
        let isOnline = await getGithubData(false)
        if (!isOnline) throw "[SW] Cannot access GitHub"

        await setupCache()
        await runPrecache()
        console.debug("[SW] Installed")
    })())
})
self.addEventListener("activate", function (ev) {
    ev.waitUntil((async function () {
        let isOnline = await getGithubData(false)
        if (!isOnline) throw "[SW] Cannot access GitHub"

        await getCacheData()
        console.debug("[SW] Activated")
    })())
})
