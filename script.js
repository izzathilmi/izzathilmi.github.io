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

// DNA Helix Logic
const container = document.getElementById('helix-container');
const numRows = 30; 
const speed = 0.01;
let rotation = 0;
const rows = [];

function initHelix() {
    for (let i = 0; i < numRows; i++) {
        const connector = document.createElement('div');
        connector.className = 'connector';
        const dot1 = document.createElement('div');
        dot1.className = 'node strand-1';
        const dot2 = document.createElement('div');
        dot2.className = 'node strand-2';

        container.appendChild(connector);
        container.appendChild(dot1);
        container.appendChild(dot2);
        rows.push({ connector, dot1, dot2, offset: i * 0.3 });
    }
}

function animate() {
    rotation += speed;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const centerX = containerWidth / 2;
    const amplitude = Math.min(containerWidth * 0.4, 80); 

    rows.forEach((row, i) => {
        const y = (i / numRows) * containerHeight;
        const x1 = Math.sin(rotation + row.offset) * amplitude + centerX;
        const x2 = Math.sin(rotation + row.offset + Math.PI) * amplitude + centerX;
        const z1 = Math.cos(rotation + row.offset);
        const z2 = Math.cos(rotation + row.offset + Math.PI);
        
        const scale1 = (z1 + 2) / 3; 
        const scale2 = (z2 + 2) / 3;

        row.dot1.style.left = `${x1}px`;
        row.dot1.style.top = `${y}px`;
        row.dot1.style.transform = `translate(-50%, -50%) scale(${scale1})`;
        row.dot1.style.opacity = (z1 + 1.5) / 2.5;

        row.dot2.style.left = `${x2}px`;
        row.dot2.style.top = `${y}px`;
        row.dot2.style.transform = `translate(-50%, -50%) scale(${scale2})`;
        row.dot2.style.opacity = (z2 + 1.5) / 2.5;

        row.connector.style.width = `${Math.abs(x1 - x2)}px`;
        row.connector.style.left = `${Math.min(x1, x2)}px`;
        row.connector.style.top = `${y}px`;
        row.connector.style.opacity = Math.min(scale1, scale2) * 0.5;
    });
    requestAnimationFrame(animate);
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    themeToggle.textContent = isLight ? '🌙' : '☀️';
});

// Scroll Hide Logic
window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        indicator.classList.add('hidden');
    } else {
        indicator.classList.remove('hidden');
    }
});

// Start everything
initHelix();
animate();
