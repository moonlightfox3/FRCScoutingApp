// Imports
importScripts("/FRCScoutingApp/libs/github.js")

// Caching
const cachePrefix = "FRCScoutingApp_"
const precacheResources = [ // No need to precache some resources, but might as well precache almost everything
    "/sw.js", "/manifest.json", "/index.html",
    "/libs/datafile.js", "/libs/elements.js", "/libs/gamepadControl.js", "/libs/gamepads.js", "/libs/github.js", "/libs/install.js", "/libs/profile.js", "/libs/server.js", "/libs/swrun.js", "/libs/style.css", "/libs/index-style.css",
    "/year/Reefscape.html", "/year/Reefscape.js", "/year/Rebuilt.html", "/year/Rebuilt.js",
    "/year-pit/Rebuilt.html", "/year-pit/Rebuilt.js",
    "/year-libs/keys.js", "/year-libs/years.js", "/year-libs/style.css",
    "/tool/storageViewer.html", "/tool/storageViewer-style.css", "/tool/contentManager.html", "/tool/contentManager-style.css", "/tool/server.html", "/tool/server-style.css",
    "/icons/icon.svg", "/icons/apple-touch-icon-1024x1024.png",
    "/year-img/Reefscape.png", "/year-img/Rebuilt.png",

    // Don't precache:
    // "/year/Placeholder.html", "/year/Placeholder.js",
    // "/README.md", "/TODO.yaml",
]
const excludeCacheResourceParts = [
    "fonts.googleapis.com", "fonts.gstatic.com", "github.com",
    "unpkg.com", "supabase",
]
async function runPrecache () {
    console.debug("[SW] Precaching resources")
    await cache.addAll(precacheResources.map(val => `/FRCScoutingApp${val}`))
}
function shouldUseCache (url) {
    for (let excludePart of excludeCacheResourceParts) {
        if (url.includes(excludePart)) return false
    }
    return true
}

// Get the cache
let cacheCommitId = null
async function getCache () {
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

// Create the cache
let cacheName = null
let cache = null
async function createCache () {
    // Variables
    cacheName = `${cachePrefix}${commitId ?? `tmp${Date.now()}`}`
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

// Delete the cache
async function deleteCache () {
    // Find the cache name (there should only be one)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix))
    for (let relevantName of relevantNames) await caches.delete(relevantName)

    console.debug("[SW] Removed cache(s)")
}

// On request
self.addEventListener("fetch", function (ev) {
    console.debug(`[SW] Got request: ${ev.request.url}`)

    // Need to do async work
    ev.respondWith((async function () {
        // Should check the cache?
        let useCache = shouldUseCache(ev.request.url)
            
        if (useCache) {
            // Check if the response is already cached, return it if it is (otherwise return an error - it should be cached)
            let cachedResp = await caches.match(ev.request)
            if (cachedResp != null) {
                console.debug("[SW] Responding from cache")
                return cachedResp
            } else return Response.error()
        } else {
            // Make a request
            console.debug("[SW] Fetching response")

            let resp = null
            try {
                resp = await fetch(ev.request, {cache: "reload"})
            } catch (er) {
                console.debug("[SW] Network error")
            }
            
            return resp
        }
    })())
})

// On install - Set up cache
self.addEventListener("install", function (ev) {
    console.debug("[SW] Installing")

    ev.waitUntil((async function () {
        await getGithubData()
        console.debug(`[SW] GitHub commit ID: ${commitId}`)
        console.debug(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)

        await getCache()
        if (cache != null) await deleteCache()
        await createCache()
        console.debug("[SW] Installed")
        
        // Setup
        await self.skipWaiting()
    })())
})
self.addEventListener("activate", function (ev) {
    console.debug("[SW] Activating")

    ev.waitUntil((async function () {
        console.debug("[SW] Activated")
        
        // Setup
        await self.clients.claim()
    })())
})

// Client communication
self.addEventListener("message", function (ev) {
    let msg = ev.data, cl = ev.source
    if (msg?.id == "reload") {
        cl.postMessage({
            id: "github",
            commitId,
            commitDate,
            deployedToPages,
        })
    }
})
