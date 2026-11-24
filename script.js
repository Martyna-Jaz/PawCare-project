const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-toggle__text');
const themeIcon = document.querySelector('.theme-toggle__icon');

function applyTheme(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.setAttribute('aria-pressed', String(isDarkMode));

    if (isDarkMode) {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeText.textContent = 'Light mode';
        themeIcon.textContent = '☀️';
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeText.textContent = 'Dark mode';
        themeIcon.textContent = '🌙';
    }
}

const savedTheme = localStorage.getItem('pawcare-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme(true);
} else {
    applyTheme(false);
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    localStorage.setItem('pawcare-theme', isDarkMode ? 'dark' : 'light');
    applyTheme(isDarkMode);
});
