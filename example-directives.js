// a simple directive which logs any element with the 'log-me' directive
simpleDirective.register('log-me', function (targetElement) {
    console.log('log', targetElement);
});

// a directive to check if a target element is in view
simpleDirective.register('in-view', function (targetElement) {

    // check if a threshold was set
    const config = {
        threshold: Number(targetElement.getAttribute('in-view-threshold') || 0)
    };

    // create a IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            console.log({
                target: entry.target,
                'is intersecting:': entry.isIntersecting
            });

            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, config);

    // observe your element
    observer.observe(targetElement);

    // add a disconnect method to your element (if needed)
    targetElement.unobserve = () => {
        observer.disconnect(targetElement);
    }
});
