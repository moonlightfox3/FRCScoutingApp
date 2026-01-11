// Create custom input element
class UINumberInputElement extends HTMLElement {
    constructor () {
        super()
        let shadow = this.attachShadow({mode: "open"})

        let numberInput = document.createElement("input")
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
        numberInput.style.display = "inline-block"
        numberInput.style.outline = "none"
        numberInput.style.backgroundColor = "lightgray"
        numberInput.style.color = "black"
        numberInput.style.cursor = "text"
        numberInput.style.width = "160px"
        numberInput.style.height = "16px"
        numberInput.style.border = "none"
        numberInput.style.borderRadius = "5px"
        
        let increaseButton = document.createElement("button")
        increaseButton.id = "increase"
        increaseButton.innerText = "+"
        increaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) + 1
        increaseButton.style.display = "inline-block"
        increaseButton.style.position = "relative"
        increaseButton.style.left = "-106px"
        increaseButton.style.flex = "0 0 53px"
        increaseButton.style.outline = "none"
        increaseButton.style.backgroundColor = "lightgray"
        increaseButton.style.color = "black"
        increaseButton.style.cursor = "pointer"
        increaseButton.style.width = "53px"
        increaseButton.style.height = "18px"
        increaseButton.style.border = "none"
        increaseButton.style.borderLeft = "1px solid darkgray"
        increaseButton.style.borderRadius = "5px"

        let decreaseButton = document.createElement("button")
        decreaseButton.id = "decrease"
        decreaseButton.innerText = "-"
        decreaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) - 1
        decreaseButton.style.display = "inline-block"
        decreaseButton.style.position = "relative"
        decreaseButton.style.left = "-106px"
        increaseButton.style.flex = "0 0 53px"
        decreaseButton.style.outline = "none"
        decreaseButton.style.backgroundColor = "lightgray"
        decreaseButton.style.color = "black"
        decreaseButton.style.cursor = "pointer"
        decreaseButton.style.width = "53px"
        decreaseButton.style.height = "18px"
        decreaseButton.style.border = "none"
        decreaseButton.style.borderLeft = "1px solid darkgray"
        decreaseButton.style.borderRadius = "5px"

        shadow.append(numberInput, increaseButton, decreaseButton)
    }
    
    static observedAttributes = ["placeholder"]
    get placeholder () { return this.getAttribute("placeholder") }
    set placeholder (value) { this.setAttribute("placeholder", value) }

    get value () { return this.shadowRoot.querySelector("input#input").value }
    set value (value) { this.shadowRoot.querySelector("input#input").value = value }

    connectedCallback () {
        this.style.backgroundColor = "lightgray"
        this.style.width = "164px"
        this.style.height = "18px"
        this.style.border = "1px solid gray"
        this.style.borderRadius = "5px"
        this.style.display = "inline-flex"
    }
    attributeChangedCallback (name, oldVal, newVal) {
        if (name == "placeholder") this.shadowRoot.querySelector("input#input").placeholder = newVal
    }
}
customElements.define("ui-input-number", UINumberInputElement)
