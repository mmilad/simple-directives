# Simple Directive

Simple Directive is just a small codesnippet to register custom directives with ease.
The snippet uses the mutation observer to see changes on the dom and check if a directive was attached.

# Installation
Copy `main.js` file into your project. You may modify it to your needs.

# Usage
Initialize like:
`window.simpleDirective = new SimpleDirectives();`

Register your directive:
```
simpleDirective.register('my-directive' , function(el) {
    // ... do something with your element
});
```

Use your custom directive on an element:
`<div my-directive>my element</div>`

# Examples
For additional examples checkout the `example-directives.js` file.