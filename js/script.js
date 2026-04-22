document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');

    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const currentLanguage = document.documentElement.lang;
            const elements = document.querySelectorAll('[data-fr], [data-en]');

            if (currentLanguage === 'fr') {
                document.documentElement.lang = 'en';
                languageToggle.textContent = 'FR';
                elements.forEach(element => {
                    if (element.hasAttribute('data-en')) {
                        element.innerHTML = element.getAttribute('data-en');
                    }
                });
            } else {
                document.documentElement.lang = 'fr';
                languageToggle.textContent = 'EN';
                elements.forEach(element => {
                    if (element.hasAttribute('data-fr')) {
                        element.innerHTML = element.getAttribute('data-fr');
                    }
                });
            }
        });
    } else {
        console.error('Language toggle button not found');
    }
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    if (hamburger && navUl) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('open');
            if (navUl.classList.contains('open')) {
                hamburger.innerHTML = '&times;';
                document.body.style.overflow = 'hidden';
            } else {
                hamburger.innerHTML = '&#9776;';
                document.body.style.overflow = '';
            }
        });
        // Optionally close menu when clicking a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('open');
                hamburger.innerHTML = '&#9776;';
                document.body.style.overflow = '';
            });
        });
    }

    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: observer.unobserve(entry.target) to animate only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }
});
