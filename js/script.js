// Bascule jour / nuit. Le thème est appliqué avant l'affichage par le petit
// script inline du <head> ; ici on gère seulement le bouton.
(function () {
    var root = document.documentElement;
    var button = document.querySelector('.theme-toggle');
    if (!button) return;

    var isFr = root.lang === 'fr';
    var labels = isFr
        ? { dark: 'Nuit', light: 'Jour', toDark: 'Passer en mode nuit', toLight: 'Passer en mode jour' }
        : { dark: 'Night', light: 'Day', toDark: 'Switch to night mode', toLight: 'Switch to day mode' };

    function currentTheme() {
        var forced = root.getAttribute('data-theme');
        if (forced) return forced;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function render() {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        button.textContent = labels[next];
        button.setAttribute('aria-label', next === 'dark' ? labels.toDark : labels.toLight);
    }

    button.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
    render();
})();
