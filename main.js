class SimpleDirectives {

    #directives = {};
    #observer;

    #base_callback = (mutationList) => {
        for (const mutation of mutationList) {
            this.#checkChange(mutation);
        }
    };

    constructor({ callback, target, options } = {}) {
        this.#observer = new MutationObserver(callback || this.#base_callback);
        this.#observer.observe(target || document, options || { attributes: true, childList: true, subtree: true });
    }

    // private method to check for changes on target element which was mutated
    #checkChange(mutation) {
        const target = mutation.target;
        // attach a object to the element so we can check internally which directives are already registered
        if(!target.simple_directive_registered) {
            target.simple_directive_registered = {}
        }
        for (let attr of target.getAttributeNames()) {
            if (this.#directives[attr] && !target.simple_directive_registered[attr]) {
                // execute your code on target element
                this.#directives[attr](target);
                // mark your directive as registered on target element
                target.simple_directive_registered[attr] = true;
            }
        }
    }

    // add a directive name and function
    register(name, callback) {
        if(!this.#directives[name]) {
            // register directive if not already registerd
            this.#directives[name] = callback;
            // return true if directive was registered
            return true;
        }
        // return false if directive was already registered
        return false;
    }

    // remove a previously registered directive
    unregister(name) {
        if (this.#directives[name]) {
            // delete directive when exists
            delete this.#directives[name];
            // return true when successfully deleted
            return true
        }
        // return false when directive was not found and not deleted
        return false;
    }
}
window.simpleDirective = new SimpleDirectives();