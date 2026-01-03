// Menu states
let profileExpanded = false
let profileSettingsExpanded = false

// Create menus
function createProfileMenus () {
    // Profile bar
    let profile = document.createElement("div")
    profile.id = "profile"
    profile.innerHTML = `Made by <i>Joe M. (moonlightfox3)</i> - <a class="profileLink" target="_blank" href="https://github.com/moonlightfox3/FRCScoutingApp"><b>GitHub repo here</b></a> | <button id="profileSettingsOpen">Show page info and settings</button>`
    
    // Profile bar open/close button
    let profileExpand = document.createElement("div")
    profileExpand.id = "profileExpand"
    profileExpand.innerHTML = `<b>i</b>`

    // Add profile bar to document, profile bar open/close button functionality
    document.body.append(profile, profileExpand)
    profileExpand.onclick = function () {
        profileExpanded = !profileExpanded
        if (profileExpanded) profile.style.display = "block"
        else profile.style.display = "none"
    }

    // Settings menu
    let profileSettings = document.createElement("div")
    profileSettings.id = "profileSettings"
profileSettings.innerHTML = `\
<center>
    <b>About this page</b><br>
    This is an open-source scouting app for FRC.<br>
    It's designed to be used on a computer with a keyboard, or a phone/tablet with a game controller, but can also be used with a mouse or touchscreen.<br>
    Settings and keybinds are listed below. There's also a link to the source code of this page in the profile bar, next to the button to open this menu.
</center>
<hr>

<center>
    <b>General settings</b><br>
    <input type="checkbox" id="darkModeToggle" checked><label for="darkModeToggle"> Dark mode</label>
</center>
<hr>

<center>
    <b>Keybinds (keyboard/controller)</b><br>
    <i>Different for each year</i>
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

    // Add settings menu to document, settings menu open/close button functionality
    document.body.append(profileSettings)
    profileSettingsOpen.onclick = function () {
        profileSettingsExpanded = !profileSettingsExpanded
        if (profileSettingsExpanded) profileSettings.style.display = "block"
        else profileSettings.style.display = "none"
    }

    // Dark mode functionality
    darkModeToggle.onchange = function () {
        console.debug(`Changing style to ${darkModeToggle.checked ? "dark" : "light"} mode`)

        if (darkModeToggle.checked) {
            document.body.classList.remove("light")
            localStorage.removeItem("FRCScoutingApp_lightMode")
        } else {
            document.body.classList.add("light")
            localStorage.setItem("FRCScoutingApp_lightMode", "1")
        }
    }
}
