// Imports
importScripts("/FRCScoutingApp/libs/github.js")

// Caching
const cachePrefix = "FRCScoutingApp_"
const precacheResources = [ // No need to precache some resources, but might as well precache almost everything
    "/sw.js", "/manifest.json", "/index.html",
    "/libs/datafile.js", "/libs/elements.js", "/libs/gamepadControl.js", "/libs/gamepads.js", "/libs/github.js", "/libs/install.js", "/libs/profile.js", "/libs/swrun.js", "/libs/style.css", "/libs/index-style.css",
    "/year/Reefscape.html", "/year/Reefscape.js", "/year/Rebuilt.html", "/year/Rebuilt.js",
    "/year-pit/Rebuilt.html", "/year-pit/Rebuilt.js",
    "/year-libs/keys.js", "/year-libs/years.js", "/year-libs/style.css",
    "/tool/storageViewer.html", "/tool/storageViewer-style.css",
    "/icons/icon.svg", "/icons/apple-touch-icon-1024x1024.png",
    "/year-img/Reefscape.png", "/year-img/Rebuilt.png",
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
    
    // Precache
    await runPrecache()
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

// Should cache
function shouldCheckCache (url) {
    return !url.includes("github.com")
}

// On request
self.addEventListener("fetch", function (ev) {
    console.debug(`[SW] Got request: ${ev.request.url}`)

    // Need to do async work
    ev.respondWith((async function () {
        // Should check cache?
        let shouldCheck = shouldCheckCache(ev.request.url)
        if (!shouldCheck) console.debug("[SW] Passing request")

        if (shouldCheck) {
            // Make sure cache exists and is up to date
            if (commitId == null) await getGithubData(false)
            if (cacheCommitId == null) await getCacheData()
            if (commitId != null && commitId != cacheCommitId && deployedToPages) {
                console.debug("[SW] Upgrading cache")
                await caches.delete(`${cachePrefix}${cacheCommitId}`) // Still works even if the cache doesn't exist
                await setupCache()
            }

            // Check if the response is already cached, return it if it is
            let cachedResp = await caches.match(ev.request)
            if (cachedResp != null) {
                console.debug("[SW] Responding from cache")
                return cachedResp
            }
        }

        // Make a request
        console.debug("[SW] Fetching response")
        let resp = null
        try {
            resp = await fetch(ev.request, {cache: "reload"})
        } catch (er) {
            // Network error
            console.debug("[SW] Network error")
            return Response.error()
        }
        
        // Cache the response (if it's successful), and return it
        if (shouldCheck && resp.ok) {
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
        console.debug(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)

        await getCacheData()
        if (cache != null) await caches.delete(`${cachePrefix}${cacheCommitId}`)
        await setupCache()
        console.debug("[SW] Installed")
        
        // Setup
        await self.skipWaiting()
    })())
})
self.addEventListener("activate", function (ev) {
    console.debug("[SW] Activating")

    ev.waitUntil((async function () {
        await getGithubData(false)
        console.debug(`[SW] GitHub commit ID: ${commitId}`)
        console.debug(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)

        await getCacheData()
        if (cache == null) await setupCache()
        console.debug("[SW] Activated")
        
        // Setup
        await self.clients.claim()
    })())
})
self.addEventListener("message", function (ev) {
    if (ev.data == "reload") {
        console.debug("[SW] Reloading")

        ev.waitUntil((async function () {
            await getGithubData(false)
            console.debug(`[SW] GitHub commit ID: ${commitId}`)
            console.debug(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)

            await getCacheData()
            if (cache == null) await setupCache()
            console.debug("[SW] Reloaded")
        
            // Setup (may not be activated if registered very recently)
            try {
                await self.clients.claim()
            } catch (er) {}
        })())
    } else console.debug("[SW] Got unknown message")
})
