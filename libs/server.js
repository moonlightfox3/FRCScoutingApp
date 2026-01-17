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
        await supabaseClient.auth.signInWithPassword({email, password})
        return true
    } catch (er) {
        return false
    }
}
async function signOutOfSupabase () {
    try {
        await supabaseClient.auth.signOut()
        return true
    } catch (er) {
        return false
    }
}
async function isSignedInToSupabase () {
    try {
        let {data: {user}} = await supabaseClient.auth.getUser()
        return user != null
    } catch (er) {
        return false
    }
}

// Access event list
async function getEventListSupabase () {
    try {
        let {data} = await supabaseClient.from("events").select("name,is_current,is_testing")
        return data
    } catch (er) {
        return null
    }
}

// Access event data
async function getEventDataSupabase (name) {
    try {
        let {data} = await supabaseClient.from(name).select("file,file_name")
        return data
    } catch (er) {
        return null
    }
}
async function addEventDataSupabase (name, file, fileName) {
    try {
        await supabaseClient.from(name).insert([
            {file, file_name: fileName},
        ]).select()
        return true
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
        await supabaseClient.from(name).update(opts)
            .eq("file_name", fileName).select()
        return true
    } catch (er) {
        return false
    }
}
async function deleteEventDataSupabase (name, fileName) {
    await supabaseClient.from(name).delete()
        .eq("file_name", fileName)
}
