import Element from "./Element.js";
import Template from "./Template.js";

class Component {
    /**
     * 
     * @param {Template} template 
     * @param {HTMLElement | Component} parent 
     */
    constructor(template, parent) {
        this.template = template;
        this.root = null;
        this.elements = {};
        this.parent = parent;
        this.isRemoved = true;
        this.init(template);
        this.mount();
    }

    init(template) {
        console.assert(this.isRemoved, "Should be removed while calling init");
        this.root = template.root;
        this.elements = template.elements;
    }
    
    mount() {
        if (!this.template || !this.template instanceof Template) {
            throw new TypeError("Cannot mount a Component without a template");
        }
        if (!this.isRemoved) {
            throw new Error("Cannot mount a Component that is already mounted");
        }
        this.isRemoved = false;
        for (const element in this.elements) {
            console.assert(this.elements[element] instanceof Element, "Element must be instance of Element");
            if (this.elements[element].type === Element.Types.Component) {
                this.elements[element].mount();
            }
        }
        if (this.parent) {
            this.setParent(this.parent);
        }
        this.onMount();
    }

    /**
     * 
     * @param {HTMLElement | Component} parent 
     */
    setParent(parent) {
        this.parent = parent;
        this.root.remove();
        parent.appendChild(this.root);
    }

    unmount() {
        if (this.isRemoved) {
            throw new Error("Cannot unmount a Component that is already unmounted");
        }
        this.isRemoved = true;
        for (const element in this.elements) {
            console.assert(this.elements[element] instanceof Element, "Element must be instance of Element");
            if (this.elements[element].type === Element.Types.Component) {
                this.elements[element].unmount();
            }
        }
        this.root.remove();
        this.onUnmount();
    }

    /**
     * 
     * @param {{ string: (HTMLElement | Component | String) }} props 
     */
    populate(props) {
        for (const propname in props) {
            if (!this.elements.hasOwnProperty(propname)) {
                throw new Error(`Component does not support property "${propname}"`);
            }
            let propValue;
            if (props[propname] instanceof HTMLElement) {
                propValue = new Element(Element.Types.HTMLElement, propname, props[propname]);
            } else if (props[propname] instanceof Component) {
                propValue = new Element(Element.Types.Component, propname, props[propname]);
            } else if (typeof props[propname] === "string") {
                propValue = props[propname];
            }

            this.elements[propname].innerHTML = propValue;
        }
    }

    /**
     * 
     * @param {String | HTMLElement} value 
     */
    set(value) {
        this.unmount();
        if (typeof value === "string") {
            this.root.innerHTML = value;
        } else if (value instanceof HTMLElement) {
            this.root.innerHTML = "";
            this.root.appendChild(value);
        }
        this.elements = {};
        this.mount();
    }

    appendChild(component) {
        if (component instanceof Component) {
            this.root.appendChild(component.root);
            return;
        }
        if (component instanceof HTMLElement) {
            this.root.appendChild(component);
            return;
        }
        throw new Error("Unsupported component type");
    }

    onMount() {}
    onUnmount() {}
};

export default Component;