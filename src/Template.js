import Element from "./Element.js";

class Template {
    constructor(templateString) {
        this.templateString = templateString;
        this.parse();
    }
    
    parse() {
        this.root = document.createElement("div");
        this.root.innerHTML = this.templateString;
        this.elements = {};
        this.root.querySelectorAll("[data-name]").forEach(element => {
            this.elements[element.dataset.name] = new Element(Element.Types.HTMLElement, element.dataset.name, element);
        });
    }
}

export default Template;