// Create custom input element
class UINumberInputElement extends HTMLElement {
    constructor () {
        super()
        let shadow = this.attachShadow({mode: "open"})

        let numberInput = document.createElement("input") // 57px wide
        numberInput.id = "input"
        numberInput.type = "number"
        numberInput.value = "0"
        numberInput.addEventListener("change", function () {
            if (numberInput.value == "") {
                numberInput.value = "0"
                return
            }

            numberInput.value = numberInput.value.replaceAll("+", "")
            let minusOne = numberInput.value.indexOf("-"); let minusTwo = numberInput.value.indexOf("-", minusOne + 1)
            if (minusTwo > -1) numberInput.value = numberInput.value.substring(0, minusTwo) + numberInput.value.substring(minusTwo + 1)

            numberInput.value = parseInt(numberInput.value)
            if (numberInput.value == "") numberInput.value = "0"
        })
        numberInput.style.outline = "none"
        numberInput.style.backgroundColor = "lightgray"
        numberInput.style.cursor = "text"
        numberInput.style.width = "54px"
        numberInput.style.border = "none"
        
        let increaseButton = document.createElement("button") // 56px wide
        increaseButton.id = "increase"
        increaseButton.innerText = "+"
        increaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) + 1
        increaseButton.style.outline = "none"
        increaseButton.style.backgroundColor = "lightgray"
        increaseButton.style.cursor = "pointer"
        increaseButton.style.width = "53px"
        increaseButton.style.border = "none"
        increaseButton.style.borderLeft = "1px solid darkgray"

        let decreaseButton = document.createElement("button") // 56px wide
        decreaseButton.id = "decrease"
        decreaseButton.innerText = "-"
        decreaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) - 1
        decreaseButton.style.outline = "none"
        decreaseButton.style.backgroundColor = "lightgray"
        decreaseButton.style.cursor = "pointer"
        decreaseButton.style.width = "53px"
        decreaseButton.style.border = "none"
        decreaseButton.style.borderLeft = "1px solid darkgray"

        shadow.append(numberInput, increaseButton, decreaseButton)
        this.style.border = "1px solid gray"
        this.style.borderRadius = "5px"
    }
    
    static observedAttributes = ["placeholder"]
    get placeholder () { return this.getAttribute("placeholder") }
    set placeholder (value) { this.setAttribute("placeholder", value) }

    connectedCallback () {
    }
    attributeChangedCallback (name, oldVal, newVal) {
        if (name == "placeholder") this.shadowRoot.querySelector("input#input").placeholder = newVal
    }
}
customElements.define("ui-input-number", UINumberInputElement)
