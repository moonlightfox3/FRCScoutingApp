// Imports
importScripts("/FRCScoutingApp/libs/github.js")

// Caching
const cachePrefix = "FRCScoutingApp_"
const precacheResources = [ // No need to precache some resources, but might as well precache almost everything
    "/sw.js", "/manifest.json", "/index.html",
    "/libs/datafile.js", "/libs/gamepadControl.js", "/libs/gamepads.js", "/libs/github.js", "/libs/install.js", "/libs/profile.js", "/libs/swrun.js", "/libs/style.css",
    "/year/Crescendo.html", "/year/Crescendo.js", "/year/Reefscape.html", "/year/Reefscape.js", "/year/Rebuilt.html", "/year/Rebuilt.js",
    "/year-libs/years.js", "/year-libs/style.css",
    "/icons/icon.svg", "/icons/apple-touch-icon-1024x1024.png",
    "/year-img/Crescendo.png", "/year-img/Reefscape.png", "/year-img/Rebuilt.png",
]
async function runPrecache () {
    console.debug("[SW] Precaching resources")
    await cache.addAll(precacheResources.map(val => `/FRCScoutingApp${val}`))
}

// Set up the cache
let cacheName = null
let cache = null
async function setupCache () {
    // Variables
    cacheName = `${cachePrefix}${commitId}`
    cache = null
    cacheCommitId = commitId

    // Remove old cache(s)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix)).filter(val => val != cacheName)
    if (relevantNames.length > 1) {
        for (let relevantName of relevantNames) await caches.delete(relevantName)
        console.debug("[SW] Removed old cache(s)")
    }

    // Find the cache, create one if there isn't one already
    cache = await caches.open(cacheName)
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
    console.debug(`[SW] Got request: ${ev.request.url}`)

    // Don't cache some URLs
    if (ev.request.url.includes("github.com")) return console.debug("[SW] Ignoring request")

    // Need to do async work
    ev.respondWith((async function () {
        // Make sure cache exists and is up to date
        if (commitId == null) await getGithubData(false)
        if (cacheCommitId == null) await getCacheData()
        if (cacheCommitId != commitId && commitId != null) {
            console.debug("[SW] Upgrading cache")
            caches.delete(`${cachePrefix}${cacheCommitId}`) // Still works even if the cache doesn't exist
            setupCache()
        }

        // Check if the response is already cached, return it if it is
        let cachedResp = await caches.match(ev.request)
        if (cachedResp != null) {
            console.debug("[SW] Responding from cache")
            return cachedResp
        }

        // Make a request
        console.debug("[SW] Fetching response")
        let resp = null
        try {
            resp = await fetch(ev.request)
        } catch (er) {
            // Network error
            console.debug("[SW] Network error")
            return Response.error()
        }
            
        // Cache the response (if it's successful), and return it
        if (resp.ok) {
            console.debug("[SW] Caching good response")
            if (cache == null) await getCacheData()
            await cache.put(ev.request, resp.clone())
        }
        return resp
    })())
})

// On install - Set up cache
self.addEventListener("install", function (ev) {
    console.debug("[SW] Installing")

    ev.waitUntil((async function () {
        await getGithubData(false)
        console.debug(`[SW] GitHub commit ID: ${commitId}`)

        await setupCache()
        await runPrecache()
        console.debug("[SW] Installed")
        
        await self.skipWaiting()
        await self.clients.claim()
    })())
})
self.addEventListener("activate", function (ev) {
    console.debug("[SW] Activating")

    ev.waitUntil((async function () {
        await getGithubData(false)
        console.debug(`[SW] GitHub commit ID: ${commitId}`)

        await getCacheData()
        console.debug("[SW] Activated")
    })())
})
