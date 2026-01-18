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
        let {data, error} = await supabaseClient.from("events").select("name,is_current,is_testing")
        if (error != null) return null
        return data
    } catch (er) {
        return null
    }
}

// Access event data
async function getEventDataSupabase (name) {
    try {
        let {data, error} = await supabaseClient.from(name).select("file,file_name")
        if (error != null) return null
        return data
    } catch (er) {
        return null
    }
}
async function addEventDatasSupabase (name, files) { // `files` is an array of objects with name and data keys
    let filesUpload = files.map(val => ({file: val.data, file_name: val.name}))
    try {
        let {error} = await supabaseClient.from(name).insert(filesUpload).select()
        return error == null
    } catch (er) {
        return false
    }
}
async function editEventDataSupabase (name, fileName, newFileData = null, newFileName = null) {
    if (newFileData == null && newFileName == null) return false

    let opts = {}
    if (newFileData != null) opts.file = newFileData
    if (newFileName != null) opts.file_name = newFileName

    try {
        let {error} = await supabaseClient.from(name).update(opts).eq("file_name", fileName).select()
        return error == null
    } catch (er) {
        return false
    }
}
async function deleteEventDataSupabase (name, fileName) {
    try {
        let {error} = await supabaseClient.from(name).delete().eq("file_name", fileName)
        return error == null
    } catch (er) {
        return false
    }
}
