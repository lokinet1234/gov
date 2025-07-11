document.addEventListener("DOMContentLoaded", function() {

    // --- SMOOTH SCROLL & ACTIVE LINK LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // We use window.scrollTo for better cross-browser support
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            } else if (targetId === 'hero') { // Special case for home/hero
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', function() {
        let currentSectionId = 'hero';
        const offset = window.innerHeight / 2;

        contentSections.forEach(section => {
            if (window.scrollY >= section.offsetTop - offset) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Also check hero section
        const heroSection = document.getElementById('hero');
        if(window.scrollY < heroSection.offsetHeight - offset) {
            currentSectionId = 'hero';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // --- DARK/LIGHT MODE TOGGLE LOGIC ---
    const toggle = document.querySelector('.dark-mode-toggle');
    
    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // --- NEW: SCROLL-IN ANIMATION LOGIC ---
    const animatedSections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

});
