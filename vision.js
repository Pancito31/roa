// ===== MENU MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ===== TOGGLE COMPARAR VISIÓN Y MISIÓN =====
const toggleBtn = document.getElementById('toggleBtn');
const cards = document.querySelectorAll('.card');
let isComparing = false;

toggleBtn.addEventListener('click', function() {
    isComparing = !isComparing;
    
    if (isComparing) {
        // MODO COMPARACIÓN
        toggleBtn.textContent = '✕ Salir de Comparación';
        toggleBtn.style.background = '#e74c3c';
        
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${index === 0 ? '-20%' : '20%'}) scale(0.9)`;
            card.style.zIndex = index === 0 ? 2 : 1;
            card.style.boxShadow = '0 30px 80px rgba(255,107,107,0.4)';
            
            // Destacar stats
            const stats = card.querySelector('.card-stats');
            if (stats) {
                stats.style.background = 'linear-gradient(45deg, #FF6B6B, #F39C12)';
                stats.style.color = 'white';
            }
        });
        
        // Línea de comparación central
        createComparisonLine();
        
    } else {
        // MODO NORMAL
        toggleBtn.textContent = '👁️ Comparar Visión y Misión';
        toggleBtn.style.background = 'var(--primary)';
        
        cards.forEach(card => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = 'auto';
            card.style.boxShadow = 'var(--shadow)';
            
            const stats = card.querySelector('.card-stats');
            if (stats) {
                stats.style.background = 'var(--light-gray)';
                stats.style.color = 'var(--primary)';
            }
        });
        
        removeComparisonLine();
    }
});

// Crear línea de comparación
function createComparisonLine() {
    const line = document.createElement('div');
    line.id = 'comparison-line';
    line.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 400px;
        background: linear-gradient(to bottom, #FF6B6B, #F39C12);
        transform: translate(-50%, -50%);
        border-radius: 2px;
        box-shadow: 0 0 20px rgba(255,107,107,0.6);
        z-index: 10;
        animation: pulse 2s infinite;
    `;
    document.body.appendChild(line);
}

// Remover línea
function removeComparisonLine() {
    const line = document.getElementById('comparison-line');
    if (line) line.remove();
}

// CSS para animación pulse (agrega a estilo2.css)