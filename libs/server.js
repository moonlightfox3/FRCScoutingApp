// This uses a Supabase database to store data

// Config
const supabaseServerUrl = "https://gzykzdsyjbxommolnzvx.supabase.co"
const supabasePublishableApiKey = "sb_publishable_CyMyZ3IKILdgjj96CC-Ozg_PhoPRES6" // You need to sign in to do anything, this is fine

// Client
let supabaseClient = null
async function setupClientSupabase () {
    supabaseClient = supabase.createClient(supabaseServerUrl, supabasePublishableApiKey)
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

// Access
async function getEventListSupabase () {
    try {
        let {data} = await supabaseClient.from("events").select("name,is_current,is_testing")
        return data
    } catch (er) {
        return null
    }
}
async function getEventDataSupabase (name = "") {
    try {
        let {data} = await supabaseClient.from(name).select("file")
        return data
    } catch (er) {
        return null
    }
}
