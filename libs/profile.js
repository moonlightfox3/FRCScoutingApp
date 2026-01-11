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
        if (profileExpanded) {
            profile.style.display = "block"
            updateDateEl.style.display = "none"
        } else {
            updateDateEl.style.display = "block"
            profile.style.display = "none"
        }
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
    <input type="checkbox" id="darkModeToggle" ${!!parseInt(localStorage.getItem("FRCScoutingApp_lightMode")) ? "" : "checked"}><label for="darkModeToggle"> Dark mode</label>
</center>
<hr>

<center>
    <b>Keybinds (keyboard/controller)</b><br>
    <i>Different for each year</i>
</center>
Reefscape:<br>
${keysToHtmlStr(2025)}<br>
<br>
Rebuilt:<br>
${keysToHtmlStr(2026)}
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

        // Toggle, save
        if (darkModeToggle.checked) {
            document.body.classList.remove("light")
            localStorage.removeItem("FRCScoutingApp_lightMode")
        } else {
            document.body.classList.add("light")
            localStorage.setItem("FRCScoutingApp_lightMode", "1")
        }
    }
}

// Get a list of keys as a string
function keysToHtmlStr (year) {
    setKeyVars(year, false)
    let keyboardKeysStr = Object.keys(keys).map(val => `${htmlSpaces(8)}${getKeyNameAsText(val)}: ${getKeyAsText(keys[val])}`).join("<br>")
    let gamepadKeysStr = Object.keys(gamepadKeys).map(val => `${htmlSpaces(8)}${getKeyNameAsText(val)}: ${getGamepadKeyAsText(gamepadKeys[val])}`).join("<br>")
    setKeyVars(-1)

return `\
${htmlSpaces(4)}Keyboard:<br>
${keyboardKeysStr}<br>
${htmlSpaces(4)}Gamepad:<br>
${gamepadKeysStr}
`
}

// Convert some keys to other text
function getKeyAsText (key) {
    if (key == " ") return "Space"
    else if (key == "enter") return "Enter"
    else return key
}
function getGamepadKeyAsText (key) {
    if (key == "RD") return "RightDown"
    else if (key == "RR") return "RightRight"
    else if (key == "RL") return "RightLeft"
    else if (key == "RU") return "RightUp"
    else if (key == "LBU") return "LeftBumper"
    else if (key == "RBU") return "RightBumper"
    else if (key == "LBD") return "LeftTrigger"
    else if (key == "RBD") return "RightTrigger"
    else if (key == "ML") return "MiddleLeft"
    else if (key == "MR") return "MiddleRight"
    else if (key == "JL") return "JoystickLeft"
    else if (key == "JR") return "JoystickRight"
    else if (key == "LU") return "LeftUp"
    else if (key == "LD") return "LeftDown"
    else if (key == "LL") return "LeftLeft"
    else if (key == "LR") return "LeftRight"
    else if (key == "MM") return "MiddleMiddle"
    else return key
}
function getKeyNameAsText (keyName) {
    // Change underscores to parentheses
    if (keyName.includes("_")) {
        let underscoreIndex = keyName.indexOf("_")
        keyName = `${keyName.substring(0, underscoreIndex)} (${keyName.substring(underscoreIndex + 1)})`
    }

    // Split words apart
    let keyNameOut = ""
    for (let i = 0; i < keyName.length; i++) {
        let prevChar = keyNameOut[keyNameOut.length - 1]

        if ((/[A-Z]/g.test(keyName[i]) || (/[0-9]/g.test(keyName[i]) && !/[0-9]/g.test(prevChar))) && prevChar != "(") keyNameOut += " "
        if (i == 0 || prevChar == "(") keyNameOut += keyName[i].toUpperCase()
        else keyNameOut += keyName[i].toLowerCase()
    }

    // Special cases
    keyNameOut = keyNameOut.split(" ")
    for (let i = 0; i < keyNameOut.length; i++) {
        if (keyNameOut[i] == null) continue
        else if (keyNameOut[i] == "l") {
            let change = true
            if (keyNameOut[i + 1] == "1") keyNameOut[i] = "L1"
            else if (keyNameOut[i + 1] == "2") keyNameOut[i] = "L2"
            else if (keyNameOut[i + 1] == "3") keyNameOut[i] = "L3"
            else if (keyNameOut[i + 1] == "4") keyNameOut[i] = "L4"
            else change = false

            if (change) keyNameOut[i + 1] = null
        }
    }
    keyNameOut = keyNameOut.filter(val => val != null).join(" ")

    return keyNameOut
}

// Insert spaces in HTML
function htmlSpaces (count) {
    return "&nbsp;".repeat(count)
}
