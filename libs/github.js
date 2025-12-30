// Config
const gitUserName = "moonlightfox3", gitRepoName = "FRCScoutingApp"

// Use GitHub's API
async function getCommit () {
    try {
        console.debug(`Getting latest commit data for GitHub repo '${gitUserName}/${gitRepoName}'`)
        let resp = await fetch(`https://api.github.com/repos/${gitUserName}/${gitRepoName}/commits?per_page=1`)

        if (!resp.ok) return null
        let json = await resp.json()
        return json[0]
    } catch (er) {
        // Network error
        console.debug("Could not get latest commit data")
        return null
    }
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

    return commit.sha.substring(0, 8)
}
function getCommitDate () {
    // Was the commit fetched?
    if (commit == null) return null
    
    let date = new Date(commit.commit.committer.date)
    let str = date.toLocaleDateString("en-US", {hour: "numeric", minute: "numeric"})
    return str
}

// Show the update status element
let updateDateEl = null
function showCommitUpdate (isOnline) {
    hideCommitUpdate()
    
    updateDateEl = document.createElement("div")
    if (isOnline) updateDateEl.innerText = `Updated ${commitDate} (commit ${commitId})`
    else updateDateEl.innerText = "App loaded from your browser's offline cache"

    updateDateEl.style.position = "sticky"
    updateDateEl.style.left = "5px"
    updateDateEl.style.top = "calc(100% - 30px)"
    updateDateEl.style.width = "calc(100% - 60px)"
    
    document.body.append(updateDateEl)
}
function hideCommitUpdate () {
    if (updateDateEl != null) {
        updateDateEl.remove()
        updateDateEl = null
    }
}
