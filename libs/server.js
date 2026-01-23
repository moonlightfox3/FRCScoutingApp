// This uses a Supabase database to store data

// Config
const supabaseServerUrl = "https://gzykzdsyjbxommolnzvx.supabase.co"
const supabasePublishableApiKey = "sb_publishable_CyMyZ3IKILdgjj96CC-Ozg_PhoPRES6" // You need to sign in to do anything, this is fine

// Externally set config
let onSupabaseLoaded = () => {}

// Client
let supabaseClient = null
async function setupClientSupabase () {
    supabaseClient = supabase.createClient(supabaseServerUrl, supabasePublishableApiKey)
    onSupabaseLoaded()
}
addEventListener("load", () => setupClientSupabase())

// Authentication
async function signInToSupabase (email, password) {
    try {
        let {error} = await supabaseClient.auth.signInWithPassword({email, password})
        return error == null
    } catch (er) {
        return false
    }
}
async function signOutOfSupabase () {
    try {
        let {error} = await supabaseClient.auth.signOut()
        return error == null
    } catch (er) {
        return false
    }
}
async function isSignedInToSupabase () {
    try {
        let {data: {user}, error} = await supabaseClient.auth.getUser()
        return user != null && error == null
    } catch (er) {
        return false
    }
}

// Access event list
async function getEventListSupabase () {
    try {
        let {data, error} = await supabaseClient.from("events").select("name,is_current,is_testing,nice_name")
        if (error != null) return null
        return data
    } catch (er) {
        return null
    }
}

// Access event data
async function getEventDataSupabase (name) {
    try {
        let {data, error} = await supabaseClient.from(name).select("name,data,is_pit,year")
        if (error != null) return null
        return data
    } catch (er) {
        return null
    }
}
async function addEventDatasSupabase (name, files) { // `files` is an array of objects with name, data, is_pit, and year keys
    try {
        let {error} = await supabaseClient.from(name).insert(files).select()
        return error == null
    } catch (er) {
        return false
    }
}
async function editEventDataSupabase (name, fileName, newFileName = null, newFileData = null, newFileIsPit = null, newFileYear = null) {
    if (newFileName == null && newFileData == null && newFileIsPit == null && newFileYear == null) return true

    let opts = {}
    if (newFileName != null) opts.name = newFileName
    if (newFileData != null) opts.data = newFileData
    if (newFileIsPit != null) opts.is_pit = newFileIsPit
    if (newFileYear != null) opts.year = newFileYear

    try {
        let {error} = await supabaseClient.from(name).update(opts).eq("name", fileName).select()
        return error == null
    } catch (er) {
        return false
    }
}
async function deleteEventDataSupabase (name, fileName) {
    try {
        let {error} = await supabaseClient.from(name).delete().eq("name", fileName)
        return error == null
    } catch (er) {
        return false
    }
}

// Usage
function getStorage () {
    let files = []
    let storage = localStorage.getItem("FRCScoutingApp_files")
    if (storage == null) return []
    storage = JSON.parse(storage)

    files.push(...getStoragePart(storage, "matches", false))
    files.push(...getStoragePart(storage, "pits", true))
    return files
}
function getStoragePart (storage, part, partIsPit) {
    let storagePart = storage[part]
    if (storagePart == undefined) return []

    let files = []
    for (let year of Object.keys(storagePart)) {
        let years = storagePart[year]
        for (let yearData of years) files.push({name: yearData.name, data: yearData.data, is_pit: partIsPit, year: +year})
    }
    return files
}
async function userUploadToServer (files) {
    if (!confirm("Upload all saved files to the server?")) return
    if (files.length == 0) return alert("There are no files to upload!")
    
    let isSignedIn = await isSignedInToSupabase()
    if (!isSignedIn) return alert("Please sign in to the server to upload files!")
    
    let events = await getEventListSupabase()
    if (events.length == 0) return alert("There are currently no events available to upload files to.")
    events = events.toSorted((a, b) => b.is_current - a.is_current).toSorted((a, b) => a.is_testing - b.is_testing)

    let eventsStr = events.map((val, idx) => `${idx}: ${val.nice_name}${val.is_current ? " (current)" : ""}${val.is_testing ? " (testing/practice)" : ""}`).join("\n")
    let event = prompt(`Which event would you like to upload these files to?\n${eventsStr}`)
    if (event == "" || event == null || isNaN(event) || +event < 0 || +event >= events.length) return alert("Invalid event choice.")
    event = events[event].name

    let success = await addEventDatasSupabase(event, files)
    if (success) alert("Files uploaded to the server!")
    else alert("Failed to upload files to the server.")
    return success
}
async function userUploadStorageToServer () {
    let files = getStorage()
    let success = await userUploadToServer(files)
    if (success) {
        if (confirm("Delete locally saved files?")) clearFileStorage()
    }
    return success
}
async function userUploadCurrentFileToServer () {
    let file = exportData()
    let files = [{
        name: getDataFileName(),
        data: file,
        is_pit: dataIsPit,
        year: dataYear,
    }]
    let success = await userUploadToServer(files)
    return success
}

// More storage things
function clearFileStorage () {
    localStorage.removeItem("FRCScoutingApp_files")
}
