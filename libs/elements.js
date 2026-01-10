// Create custom input element
class UINumberInputElement extends HTMLElement {
    constructor () {
        super()
        
        let shadow = this.attachShadow({mode: "open"})

        let style = document.createElement("style")
        style.textContent = `\
        `
        shadow.append(style)

        let numberInput = document.createElement("input")
        numberInput.id = "input"
        numberInput.type = "number"
        numberInput.value = "0"
        shadow.append(numberInput)
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
