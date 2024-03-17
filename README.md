# Bare
A minimalistic component-based frontend library for DOM manipulation

# Usage
```bash
cd your-project
git clone https://github.com/omkarbhale/bare.git
```
Then, in your javascript module
```js
import Bare from "bare/Bare.js";

class MyComponent extends Bare.Component {
    constructor(parent) {
        const templateString = `
            <div class="myclass" data-name="test1"></div>
            <div class="myclass" data-name="test2"></div>
            <div class="myclass" data-name="test3"></div>
        `;
        const template = new Bare.Template(templateString);
        
        super(template, parent);
    }
}

const c1 = new MyComponent(document.body);
const c2 = new MyComponent(null); // without parent

c1.populate({
    test1: 'a',
    test2: c2,
    test3: 'c'
});

// This will also update test2 inside c1
c2.populate({
    test1: '1',
    test2: '2',
    test3: '3'
});
```

# Contributions
Just open a issue

Have fun!
