document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');

    // Helper: applies a language to all language-aware elements on the page.
    // Handles text content (data-fr / data-en) AND image swaps + aria/alt
    // attributes (data-fr-src / data-en-src, data-fr-alt / data-en-alt,
    // data-fr-aria / data-en-aria).
    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        languageToggle.textContent = lang === 'fr' ? 'EN' : 'FR';

        // Text content
        document.querySelectorAll('[data-fr], [data-en]').forEach(el => {
            const value = el.getAttribute('data-' + lang);
            if (value !== null) {
                el.innerHTML = value;
            }
        });

        // Image src swaps (e.g. Google Play badge in FR / EN)
        document.querySelectorAll('[data-fr-src], [data-en-src]').forEach(el => {
            const src = el.getAttribute('data-' + lang + '-src');
            if (src) el.setAttribute('src', src);
        });

        // Alt text swaps
        document.querySelectorAll('[data-fr-alt], [data-en-alt]').forEach(el => {
            const alt = el.getAttribute('data-' + lang + '-alt');
            if (alt) el.setAttribute('alt', alt);
        });

        // Aria-label swaps
        document.querySelectorAll('[data-fr-aria], [data-en-aria]').forEach(el => {
            const aria = el.getAttribute('data-' + lang + '-aria');
            if (aria) el.setAttribute('aria-label', aria);
        });
    }

    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const currentLanguage = document.documentElement.lang;
            const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
            applyLanguage(newLanguage);
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
