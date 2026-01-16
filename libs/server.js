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
    await supabaseClient.auth.signInWithPassword({email, password})
}
async function signOutOfSupabase () {
    await supabaseClient.auth.signOut()
}

// Access
async function getEventListSupabase () {
    let {data} = await supabaseClient.from("events").select("name,is_current,is_testing")
    return data
}
async function getEventDataSupabase (name) {
    let {data} = await supabaseClient.from(name).select("file")
    return data
}
