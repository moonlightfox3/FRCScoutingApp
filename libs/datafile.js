// Pages to open based on file type
const fileTypeLocations = {
    2025: "year/Reefscape.html",
    2026: "year/Rebuilt.html",
}
const fileTypeLocationsPit = {
    2026: "year-pit/Rebuilt.html",
}

// Was this opened with an exported data file?
let openedWithFile = false
// Check for launching by opening an associated file type
if (isPWA && window.launchQueue != undefined) {
    launchQueue.setConsumer(async function (params) {
        // Was a file opened?
        openedWithFile = params.files.length > 0
        if (openedWithFile) {
            let file = await params.files[0].getFile()
            let text = await file.text()

            // Ignore empty files
            if (text != "") {
                console.debug(`Importing file '${file.name}'`)
                getImportedFile(text)
            }
        }
    })
}

// Elements to not include for saving
const dataFileExcludeElems = ["br", "label", "a", "button"]

// Data config
let dataYear = null
let dataIsPit = false
let dataElems = null // index 0 is the team number, index 1 can be the match number (both are type=text inputs)

// Get the input elements that should be exported
let dataElemsDefaultVals = null
function initDataFile (year, isPit) {
    // Setup
    console.debug(`Initializing data file for year '${year}'`)
    dataYear = year
    dataIsPit = isPit
    dataElems = []
    dataElemsDefaultVals = []

    // Forms are split into parts, to use more horizontal space
    let divs = document.querySelector("form").querySelectorAll("div")
    let lastRadioName = null
    let lastRadioElems = []
    for (let div of divs) {
        for (let el of div.children) {
            // Don't include some elements
            if (dataFileExcludeElems.includes(el.tagName.toLowerCase())) continue

            // Radio inputs are complicated to handle
            if (el.tagName == "INPUT" && el.type == "radio" && el.name == lastRadioName) {
                // Part of the same group
                lastRadioElems.push(el)
                continue
            } else if (lastRadioName != null) {
                // Not a radio element that's part of the same group - after a group of radio elements
                dataElems.push(lastRadioElems)
                lastRadioName = null, lastRadioElems = []
            }

            // More logic for radio inputs
            if (el.tagName == "INPUT" && el.type == "radio") {
                // Radio element, not part of the same group
                lastRadioName = el.name
                lastRadioElems.push(el)
            } else dataElems.push(el) // Other element
        }
        // Make sure to use radio group
        if (lastRadioName != null) {
            dataElems.push(lastRadioElems)
            lastRadioName = null, lastRadioElems = []
        }
    }
    
    // Set defaults
    setDataElemsDefaults()

    // Import file
    checkImportedFile()
}
function setDataElemsDefaults () {
    dataElemsDefaultVals = []
    
    // Get element values
    for (let el of dataElems) {
        if (el.type == "text" || el.type == "textarea") dataElemsDefaultVals.push(el.value)
        else if (el.type == "number") dataElemsDefaultVals.push(+el.value)
        else if (el.type == "checkbox") dataElemsDefaultVals.push(el.checked)
        else if (el instanceof Array) dataElemsDefaultVals.push(el.findIndex(val => val.checked))
    }
}
function checkImportedFile () {
    // Get file data
    let fileData = localStorage.getItem("FRCScoutingApp_temp_importFile")
    if (fileData != null) {
        localStorage.removeItem("FRCScoutingApp_temp_importFile")

        // Import file
        let data = JSON.parse(`[${text}]`)
        let [fileYear, fileIsPit] = data.slice(0, 2)
        if (fileYear != dataYear || fileIsPit != dataIsPit) alert("Invalid file type imported.")
        else importData(fileData)
    }
}

// Get imported file
function getImportedFile (text) {
    // Get data
    let data = JSON.parse(`[${text}]`)
    let [year, isPit] = data.slice(0, 2)
    let path = isPit ? fileTypeLocationsPit[year] : fileTypeLocations[year]

    // Redirect
    if (path == undefined) return alert("Unknown file type imported.")
    else {
        localStorage.setItem("FRCScoutingApp_temp_importFile", text)
        let a = document.createElement("a")
        a.href = `/FRCScoutingApp/${path}`
        a.click()
    }
}
// Import file
function importData (text) {
    // Check that the elements to export were gotten
    if (dataYear == null) return
    let data = JSON.parse(`[${text}]`)
    
    // Get elements
    for (let i = 0; i < dataElems.length; i++) {
        let elem = dataElems[i], val = data[i]
        // Do different things for different types of elements
        if (elem.type == "text" || elem.type == "textarea") dataElems[i].value = val
        else if (elem.type == "number") dataElems[i].value = `${val}`
        else if (elem.type == "checkbox") dataElems[i].checked = val != 0
        else if (elem instanceof Array) dataElems[i][val].checked = true
    }

    // Set defaults
    setDataElemsDefaults()
}
// Export file
function exportData () {
    // Check that the elements to export were gotten
    if (dataYear == null) return null
    let data = null

    // Export elements
    data = new Array(dataElems.length)
    for (let i = 0; i < dataElems.length; i++) {
        let elem = dataElems[i], val = elem.value
        // Do different things for different types of elements
        if (elem.type == "text" || elem.type == "textarea") data[i] = val
        else if (elem.type == "number") data[i] = parseInt(val)
        else if (elem.type == "checkbox") data[i] = +elem.checked
        else if (elem instanceof Array) data[i] = elem.findIndex(val => val.checked)
    }

    let text = JSON.stringify([dataYear, (dataIsPit ? 1 : 0), ...data]).slice(1, -1)
    return text
}
// File name
function getDataFileName () {
    let date = new Date()
    let month = (date.getMonth() + 1).toString().padStart(2, "0"), day = date.getDate().toString().padStart(2, "0"), hour = date.getHours().toString().padStart(2, "0")
    let minute = date.getMinutes().toString().padStart(2, "0"), second = date.getSeconds().toString().padStart(2, "0"), millisecond = date.getMilliseconds().toString().padStart(3, "0")
    let time = month + day + hour + minute + second + millisecond
    return `${dataElems[0].value.replaceAll(" ", "")}${dataIsPit ? "" : "-" + dataElems[1].value.replaceAll(" ", "")}_${time}.${dataIsPit ? "pit_" : ""}smscdt${dataYear}`
}
// Download file
function downloadData () {
    // Check that the elements to export were gotten
    if (dataYear == null) return null
    let data = exportData()

    // Download file with an <a> element
    let a = document.createElement("a")
    a.download = getDataFileName()
    a.href = `data:text/plain;base64,${btoa(data)}`
    a.click()
}
// Save file in browser LocalStorage as: FRCScoutingApp_files = {pits: {(year): [{name: (fileName), data: (fileData)}, ...], ...}, matches: {(year): [{name: (fileName), data: (fileData)}, ...], ...}}
function saveDataBrowser () {
    // Check that the elements to export were gotten
    if (dataYear == null) return null
    let data = exportData()

    // Get storage
    let storage = localStorage.getItem("FRCScoutingApp_files")
    if (storage == null) storage = {}
    else storage = JSON.parse(storage)

    // Add to storage
    if (storage[dataIsPit ? "pits" : "matches"] == null) storage[dataIsPit ? "pits" : "matches"] = {}
    if (storage[dataIsPit ? "pits" : "matches"][dataYear] == null) storage[dataIsPit ? "pits" : "matches"][dataYear] = []
    storage[dataIsPit ? "pits" : "matches"][dataYear].push({name: getDataFileName(), data})
    // Save storage
    storage = JSON.stringify(storage)
    localStorage.setItem("FRCScoutingApp_files", storage)
}

// Check if any form element was changed
function getFormChanged () {
    // Check that the elements to export were gotten
    if (dataYear == null) return null

    for (let i = 0; i < dataElems.length; i++) {
        let defaultVal = dataElemsDefaultVals[i], el = dataElems[i], changed = null
        // Do different things for different types of elements
        if (el.type == "text" || el.type == "textarea") changed = el.value != defaultVal
        else if (el.type == "number") changed = +el.value != defaultVal
        else if (el.type == "checkbox") changed = el.checked != defaultVal
        else if (el instanceof Array) changed = el.findIndex(val => val.checked) != defaultVal

        // Was the element changed?
        if (changed) return true
    }

    // Nothing was changed
    return false
}
