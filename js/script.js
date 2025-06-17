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
                        element.textContent = element.getAttribute('data-en');
                    }
                });
            } else {
                document.documentElement.lang = 'fr';
                languageToggle.textContent = 'EN';
                elements.forEach(element => {
                    if (element.hasAttribute('data-fr')) {
                        element.textContent = element.getAttribute('data-fr');
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
        });
        // Optionally close menu when clicking a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navUl.classList.remove('open'));
        });
    }
});
