// Imports
importScripts("/FRCScoutingApp/libs/debug.js", "/FRCScoutingApp/libs/github.js")
log("[SW] Script loaded")

// Caching
const cachePrefix = "FRCScoutingApp_"
const precacheResources = [
    "/sw.js", "/manifest.json", "/index.html",
    "/libs/datafile.js", "/libs/debug.js", "/libs/elements.js", "/libs/gamepadControl.js", "/libs/gamepads.js", "/libs/github.js", "/libs/install.js", "/libs/profile.js", "/libs/server.js", "/libs/swrun.js", "/libs/style.css", "/libs/index-style.css",
    "/year/Placeholder.html", "/year/Placeholder.js", "/year/Reefscape.html", "/year/Reefscape.js", "/year/Rebuilt.html", "/year/Rebuilt.js",
    "/year-pit/Placeholder.html", "/year-pit/Placeholder.js", "/year-pit/Rebuilt.html", "/year-pit/Rebuilt.js",
    "/year-libs/keys.js", "/year-libs/years.js", "/year-libs/style.css",
    "/tool/contentManager.html", "/tool/contentManager-style.css", "/tool/server.html", "/tool/server-style.css", "/tool/storageViewer.html", "/tool/storageViewer-style.css", "/tool/dataViewer.html", "/tool/dataViewer-style.css",
    "/icons/icon.svg", "/icons/apple-touch-icon-1024x1024.png",
    "/year-img/Reefscape.png", "/year-img/Rebuilt.png",
    // "/README.md", "/TODO.yaml",
]
const excludeCacheResourceParts = [
    "github.com",
    "unpkg.com", "supabase",
    // "fonts.googleapis.com", "fonts.gstatic.com",
]
const canFallbackFetchResourceParts = [
    "fonts.googleapis.com", "fonts.gstatic.com",
]
async function runPrecache () {
    log("[SW] Precaching resources")
    await Promise.all(precacheResources.map(resource => precacheResource(resource)))
    log("[SW] Precached resources")
}
async function precacheResource (resource) {
    let url = `/FRCScoutingApp${resource}`
    let resp = await fetch(`/FRCScoutingApp${resource}`, {cache: "reload"})
    if (!resp.ok) throw new TypeError("Failed to fetch")
    await cache.put(url, resp)
}
function shouldUseCache (url) {
    for (let excludePart of excludeCacheResourceParts) {
        if (url.includes(excludePart)) return false
    }
    return true
}
function canFallbackFetch (url) {
    for (let fallbackPart of canFallbackFetchResourceParts) {
        if (url.includes(fallbackPart)) return true
    }
    return false
}

// Get the cache
let cacheCommitId = null
async function getCache () {
    log("[SW] Getting cache")

    // Reset variables
    cacheName = null
    cache = null
    cacheCommitId = null

    // Find the cache name (there should only be one)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix))
    if (relevantNames.length > 1) {
        log("[SW] Too many caches")
        for (let relevantName of relevantNames) await caches.delete(relevantName)
        return
    }

    // Make sure a cache exists
    let name = relevantNames[0]
    if (name == null) return log("[SW] No valid cache")

    // Set variables
    cacheCommitId = name.substring(name.indexOf("_") + 1)
    cacheName = `${cachePrefix}${cacheCommitId}`
    cache = await caches.open(cacheName)

    log("[SW] Got cache")
}

// Create the cache
let cacheName = null
let cache = null
async function createCache () {
    log("[SW] Creating cache")

    // Variables
    cacheName = `${cachePrefix}${commitId ?? `tmp${Date.now()}`}`
    cache = null
    cacheCommitId = commitId

    // Remove old cache(s)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix)).filter(val => val != cacheName)
    if (relevantNames.length > 1) {
        log("[SW] Removing old cache(s)")
        for (let relevantName of relevantNames) await caches.delete(relevantName)
    }

    // Find the cache, create one if there isn't one already
    cache = await caches.open(cacheName)
    log("[SW] Created cache")
    
    // Precache
    await runPrecache()
}

// Delete the cache
async function deleteCache () {
    log("[SW] Removing cache(s)")

    // Find the cache name (there should only be one)
    let names = await caches.keys()
    let relevantNames = names.filter(val => val.startsWith(cachePrefix))
    for (let relevantName of relevantNames) await caches.delete(relevantName)

    // Variables
    cacheName = null
    cache = null
    cacheCommitId = null

    log("[SW] Removed cache(s)")
}

// On request
async function checkCache () {
    log("[SW] Checking cache")

    // Make sure the cache is updated
    if (cacheCommitId != commitId && deployedToPages) {
        log("[SW] Cache is too old")

        await deleteCache()
        await createCache()
        return false
    } else {
        log("[SW] Cache is good")
        return true
    }
}
async function respondFromCache (request) {
    // Check if the response is already cached, return it if it is (otherwise return an error - it should be cached)
    await checkCache()
    let cachedResp = await caches.match(request)
    if (cachedResp != null) {
        log("[SW] Responding from cache")
        return cachedResp
    } else {
        await getCache()
        if (cache == null) {
            await createCache()
            if (cache == null) return null
            else return await respondFromCache(request)
        } else return null
    }
}
function onFetchHandler (ev) {
    log(`[SW] Got request: ${ev.request.url}`)

    // Need to do async work
    ev.respondWith((async function () {
        // Should check the cache?
        let useCache = shouldUseCache(ev.request.url)
        let canFallback = canFallbackFetch(ev.request.url)
            
        if (useCache) {
            let resp = await respondFromCache(ev.request)
            if (!canFallback || resp != null) return resp
            else log("[SW] Response not in cache, fetching and caching")
        }

        // Make a request
        log("[SW] Fetching response")

        try {
            let resp = await fetch(ev.request, {cache: "reload"})
            if (useCache) {
                log("[SW] Caching response")
                await cache.put(ev.request.url, resp.clone())
            }
            return resp
        } catch (er) {
            log("[SW] Network error")
            return Response.error()
        }
    })())
}
self.addEventListener("fetch", onFetchHandler)

// On install - Set up cache
let didUpdate = false
function onInstallHandler (ev) {
    log("[SW] Installing")

    ev.waitUntil((async function () {
        didUpdate = true

        await getGithubData()
        log(`[SW] GitHub commit ID: ${commitId}`)
        log(`[SW] GitHub commit date: ${commitDate}`)
        log(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)

        await deleteCache()
        await createCache()
        log(`[SW] Cache commit ID: ${cacheCommitId}`)
        log("[SW] Installed")
        
        // Setup
        await self.skipWaiting()
    })())
}
self.addEventListener("install", onInstallHandler)
function onActivateHandler (ev) {
    log("[SW] Activating")

    ev.waitUntil((async function () {
        log("[SW] Activated")
        
        // Setup
        await self.clients.claim()
    })())
}
self.addEventListener("activate", onActivateHandler)

// Client messaging
const broadcast = new BroadcastChannel("cl_sw-comms")
broadcast.onmessage = async function (ev) {
    if (ev.data.sender == "sw") return
    log(`[SW] Got message: '${ev.data.type}'`, ev.data.msg)
    
    if (ev.data.type == "reload") { // On page load
        debugMode(ev.data.msg.isDebugMode, false, false)

        await getCache()
        if (!didUpdate) {
            await getGithubData()
            log(`[SW] GitHub commit ID: ${commitId}`)
            log(`[SW] GitHub commit date: ${commitDate}`)
            log(`[SW] Has deployed to GitHub Pages: ${deployedToPages}`)
            log(`[SW] Cache commit ID: ${cacheCommitId}`)
        }
        
        broadcast.postMessage({sender: "sw", type: "github", msg: {commitId, commitDate, deployedToPages, didUpdate: didUpdate || !(await checkCache())}})
        didUpdate = false
    } else if (ev.data.type == "debug") debugMode(ev.data.msg.isDebugMode, false, false) // Set debug mode
}
