const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    toggle.innerText = isDark ? '☀️' : '🌙';
    
    // Save preference to browser memory
    localStorage.setItem('theme', newTheme);
});

// Load saved theme on startup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    toggle.innerText = savedTheme === 'dark' ? '🌙' : '☀️';
}
