let profileExpanded = false
addEventListener("load", function () {
    let profile = document.createElement("div")
    profile.id = "profile"
    profile.innerHTML = `Made by <i>Joe M. (moonlightfox3)</i>. [<a class="profileLink" target="_blank" href="https://github.com/moonlightfox3/FRCTools"><b>GitHub repo here</b></a>]`
    
    let profileExpand = document.createElement("div")
    profileExpand.id = "profileExpand"
    profileExpand.innerHTML = `<b>i</b>`

    document.body.append(profile, profileExpand)
    profileExpand.onclick = function () {
        profileExpanded = !profileExpanded
        if (profileExpanded) profile.style.display = "block"
        else profile.style.display = "none"
    }
})
