// Create custom input element
class UINumberInputElement extends HTMLElement {
    constructor () {
        super()
        
        let shadow = this.attachShadow({mode: "open"})

        let style = document.createElement("style")
        style.textContent = `\
            ui-input-number input, button {
                background-color: lightgray;
            }
            ui-input-numberinput {
                cursor: text;
            }
            ui-input-numberbutton {
                cursor: pointer;
            }
            
            ui-input-numberinput#input {
                width: 57px;
                border-right: none;
            }
            ui-input-numberbutton#increase {
                width: "56px";
                border-left: none;
                border-right: none;
            }
            ui-input-numberbutton#decrease {
                width: "56px";
                border-left: none;
            }
        `

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
        
        let increaseButton = document.createElement("button") // 56px wide
        increaseButton.id = "increase"
        increaseButton.innerText = "+"
        increaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) + 1

        let decreaseButton = document.createElement("button") // 56px wide
        decreaseButton.id = "decrease"
        decreaseButton.innerText = "-"
        decreaseButton.onclick = () => numberInput.value = parseInt(numberInput.value) - 1

        shadow.append(style, numberInput, increaseButton, decreaseButton)
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
