// Config
const gitUserName = "moonlightfox3", gitRepoName = "FRCScoutingApp"

// Use GitHub's API
async function getCommit () {
    console.debug(`Getting latest commit data for GitHub repo '${gitUserName}/${gitRepoName}'`)
    let resp = null
    try {
        resp = await fetch(`https://api.github.com/repos/${gitUserName}/${gitRepoName}/commits?per_page=1`)
    } catch (er) {
        // Network error
        console.debug("Could not get latest commit data")
        return null
    }

    if (!resp.ok) return null
    let json = await resp.json()
    return json[0]
}
let commit = null
let deployedToPages = null
async function getGithubData () {
    commit = await getCommit()

    commitId = getCommitId()
    commitDate = getCommitDate()
    deployedToPages = await hasDeployedToPages()
}

// Get data from the commit
let commitId = null
let commitDate = null
function getCommitId () {
    // Was the commit fetched?
    if (commit == null) return null

    return commit.sha.substring(0, 7)
}
function getCommitDate () {
    // Was the commit fetched?
    if (commit == null) return null
    
    let date = new Date(commit.commit.committer.date)
    let str = date.toLocaleDateString("en-US", {hour: "numeric", minute: "numeric"})
    return str
}

// Check GitHub Pages status
async function hasDeployedToPages () {
    // Was the commit fetched?
    if (commit == null) return null

    console.debug(`Getting GitHub Pages status for GitHub repo '${gitUserName}/${gitRepoName}'`)
    let resp = null
    try {
        resp = await fetch(`https://api.github.com/repos/${gitUserName}/${gitRepoName}/deployments?per_page=1`)
    } catch (er) {
        // Network error
        console.debug("Could not get GitHub Pages status")
        return null
    }

    // Check hash
    if (!resp.ok) return null
    let json = await resp.json()
    if (json[0].sha != commit.sha) return false

    try {
        resp = await fetch(`${json[0].statuses_url}?per_page=1`)
    } catch (er) {
        // Network error
        console.debug("Could not get GitHub Pages status")
        return null
    }
    
    // Check state
    if (!resp.ok) return null
    json = await resp.json()
    return json[0].state == "success"
}
