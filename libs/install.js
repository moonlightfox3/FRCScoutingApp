// Platform
const isPWA = matchMedia("(display-mode: standalone)").matches
const isIphone = navigator.platform == "iPhone"
const isAndroid = navigator.userAgent.includes("Android")
console.debug(`Is PWA: ${isPWA}, is iPhone: ${isIphone}, is Android: ${isAndroid}`)

// Theme color (titlebar color on computers and Android, second background color on iPhones)
let themeColorEl = null
function setThemeColor (color) {
    // Make sure this is a PWA
    if (!isPWA) return
    if (themeColorEl == null) {
        // Use a <meta> element
        themeColorEl = document.createElement("meta")
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
    let installButton = null
    function showInstallButton (clickCallback = () => {}) {
        hideInstallButton()

        installButton = document.createElement("button")
        installButton.innerText = "Install"
        installButton.style.position = "sticky"
        installButton.style.left = "calc(100% - 50px - 40px)"
        installButton.style.top = "calc(100% - 20px)"
        installButton.style.zIndex = "97"
        installButton.style.backgroundColor = "lightgray"
        installButton.style.color = "black"
        installButton.style.borderRadius = "5px"
        installButton.style.cursor = "pointer"
        installButton.style.paddingLeft = "6px"
        installButton.style.paddingRight = "6px"
        installButton.style.paddingTop = "1px"
        installButton.style.paddingBottom = "1px"
        installButton.style.fontSize = "14px"
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
1. Press the browser share/export button.
2. Click 'Add to Home Screen'.
`)
            })
        } else if (isAndroid) {
            // Automatic installation isn't supported on Android
            showInstallButton(function () {
alert(`\
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
