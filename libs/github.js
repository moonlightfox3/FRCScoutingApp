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
async function getGithubData (show) {
    commit = await getCommit()
    let isOnline = commit != null

    commitId = getCommitId()
    commitDate = getCommitDate()
    if (show) showCommitUpdate(isOnline)

    return isOnline
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

// Show the update status element
function showCommitUpdate (isOnline) {
    hideCommitUpdate()
    
    let updateDateEl = document.createElement("div")
    updateDateEl.id = "updateDateEl"
    if (isOnline) updateDateEl.innerText = `Updated ${commitDate} (commit ${commitId})`
    else updateDateEl.innerText = "App loaded from your browser's offline cache"
    
    document.body.append(updateDateEl)
}
function hideCommitUpdate () {
    if (document.querySelector("div#updateDateEl") != null) updateDateEl.remove()
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

    if (!resp.ok) return null
    let json = await resp.json()
    // Check commit hash
    return json[0].sha == commit.sha
}
