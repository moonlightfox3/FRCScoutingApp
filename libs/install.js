// Platform
const isPWA = matchMedia("(display-mode: standalone)").matches
const isIphone = navigator.platform == "iPhone"
const isAndroid = navigator.userAgent.includes("Android")
console.debug(`Is PWA: ${isPWA}, is iPhone: ${isIphone}, is Android: ${isAndroid}`)

// Theme color (titlebar color on computers and Android, second background color on iPhones)
function setThemeColor (color) {
    // Make sure this is a PWA
    if (!isPWA) return
    if (themeColorEl == null) {
        // Use a <meta> element
        let themeColorEl = document.createElement("meta")
        themeColorEl.id = "themeColorEl"
        themeColorEl.name = "theme-color"
        document.head.append(themeColorEl)
    }
    themeColorEl.content = color
}
function resetThemeColor () {
    // Make sure this is a PWA
    if (!isPWA) return
    if (themeColorEl != null) {
        themeColorEl.remove()
        themeColorEl = null
    }
}
// Window setup
if (isIphone || isAndroid) setThemeColor("black")
else setThemeColor("darkviolet")

// Install button
let displayInstallButton = () => {}
if (isPWA) resizeTo(1105, 590) // Window setup
else {
    function showInstallButton (clickCallback = () => {}) {
        hideInstallButton()

        let installButton = document.createElement("button")
        installButton.id = "installButton"
        installButton.innerText = "Install"
        installButton.onclick = () => clickCallback()
        document.body.append(installButton)
    }
    function hideInstallButton () {
        if (installButton != null) {
            installButton.remove()
            installButton = null
        }
    }
    addEventListener("appinstalled", () => hideInstallButton())

    displayInstallButton = function () {
        if (isIphone) {
            // Automatic installation isn't supported on iPhones
            showInstallButton(function () {
alert(`\
iPhone install instructions:
1. Press the browser share/export button.
2. Click 'Add to Home Screen'.
`)
            })
        } else if (isAndroid) {
            // Automatic installation isn't supported on Android
            showInstallButton(function () {
alert(`\
Android install instructions:
1. Press the browser options button.
2. Click 'Add shortcut'.
`)
            })
        } else {
            // Catch automatic installation event
            addEventListener("beforeinstallprompt", function (ev) {
                ev.preventDefault()
                showInstallButton(() => ev.prompt())
            })
        }
    }
}
