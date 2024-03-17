import Component from "./Component.js";

class Element {
    static get Types() {
        return {
            HTMLElement: "HTMLElement",
            Component: "Component",
        }
    }

    /**
     * 
     * @param {string} type Element
     * @param {string} name Name of the element (optional)
     * @param {*} element Element of given type
     */
    constructor(type, name, value) {
        if (!Element.Types[type]) {
            throw new Error(`Type ${type} is not supported`);
        }
        this.type = type;
        this.name = name;
        this.value = value;
    }

    /**
     * @param {Element | String} element
     */
    set innerHTML(element) {
        console.assert(element instanceof Element || typeof element === "string", "Element must be instance of element or string");
        if (typeof element === "string") {
            if (this.type === Element.Types.HTMLElement) {
                this.value.innerHTML = element;
                return;
            }
            if (this.type === Element.Types.Component) {
                this.type = Element.Types.HTMLElement;
                this.value.set(element);
                return;
            }
            console.assert(false, "Unreachable code reached");
            return;
        }
        if (element.type === Element.Types.HTMLElement) {
            if (this.type === Element.Types.HTMLElement) {
                this.value.innerHTML = "";
                this.value.appendChild(element.value);
                return;
            }
            if (this.type === Element.Types.Component) {
                this.value.set(element);
                return;
            }
            console.assert(false, "Unreachable code reached");
            return;
        }
        if (element.type === Element.Types.Component) {
            if (this.type === Element.Types.HTMLElement) {
                this.value.innerHTML = "";
                this.value.appendChild(element.value.root);
                return;
            }
            if (this.type === Element.Types.Component) {
                this.value.root.replaceWith(element.value.root);
                this.value.root = element.value.root;
                return;
            }
            console.assert(false, "Unreachable code reached");
            return;
        }
        console.assert(false, "Unreachable code reached");
    }
}

export default Element;
