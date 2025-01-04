document.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.setAttribute('data-active', currentTheme === 'light');

    // Add event listener for the switch
    themeSwitch.addEventListener('click', () => {
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLightMode ? 'dark' : 'light';

        // Update the theme
        document.documentElement.setAttribute('data-theme', newTheme);
        themeSwitch.setAttribute('data-active', !isLightMode);

        // Save the theme to localStorage
        localStorage.setItem('theme', newTheme);
    });
});