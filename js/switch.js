
document.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.getElementById('theme-switch');

    // Force set the theme to light mode on page load
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitch.setAttribute('data-active', true);

    // Add event listener for the switch
    themeSwitch.addEventListener('click', () => {
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLightMode ? 'dark' : 'light';

        // Update the theme
        document.documentElement.setAttribute('data-theme', newTheme);
        themeSwitch.setAttribute('data-active', !isLightMode);

        // Save the new theme to localStorage
        localStorage.setItem('theme', newTheme);
    });
});
