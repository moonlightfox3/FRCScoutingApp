let profileExpanded = false
let profileSettingsExpanded = false
addEventListener("load", function () {
    let profile = document.createElement("div")
    profile.id = "profile"
    profile.innerHTML = `Made by <i>Joe M. (moonlightfox3)</i>. <a class="profileLink" target="_blank" href="https://github.com/moonlightfox3/FRCScoutingApp"><b>GitHub repo here</b></a>. | <button id="profileSettingsOpen">Show page info and settings</button>`
    
    let profileExpand = document.createElement("div")
    profileExpand.id = "profileExpand"
    profileExpand.innerHTML = `<b>i</b>`

    document.body.append(profile, profileExpand)
    profileExpand.onclick = function () {
        profileExpanded = !profileExpanded
        if (profileExpanded) profile.style.display = "block"
        else profile.style.display = "none"
    }

    let profileSettings = document.createElement("div")
    profileSettings.id = "profileSettings"
profileSettings.innerHTML = `\
<center>
    <b>About this page</b><br>
    TODO
</center>
<hr>

<center>
    <b>General settings</b><br>
    TODO
</center>
<hr>

<center>
    <b>Keybinds (keyboard/controller)</b><br>
    <i>Different for each season</i>
</center>
Crescendo:<br>
TODO<br>
<br>
Reefscape:<br>
TODO<br>
<br>
Rebuilt:<br>
TODO
`

    document.body.append(profileSettings)
    profileSettingsOpen.onclick = function () {
        profileSettingsExpanded = !profileSettingsExpanded
        if (profileSettingsExpanded) profileSettings.style.display = "block"
        else profileSettings.style.display = "none"
    }
})
