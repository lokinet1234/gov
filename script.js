document.addEventListener("DOMContentLoaded", function() {

    // --- SCROLL-IN ANIMATION LOGIC ---

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the animation
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options for the observer
        root: null, // relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

});
