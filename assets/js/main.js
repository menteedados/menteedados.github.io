/**
 * Mente & Dados - Main JavaScript
 * Ponto central de inicialização
 * Versão: 1.0.0
 */

// Carregar analytics primeiro
(function() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/js/analytics.js';
    analyticsScript.async = true;
    document.head.appendChild(analyticsScript);
    
    console.log('🚀 Mente & Dados - Site carregado');
})();

// Carregar componentes
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FAQ Accordion
    if (document.querySelector('.faq-item')) {
        // Usar script inline ou importar
        console.log('📖 FAQ Accordion disponível');
    }
    
    // Inicializar Sticky CTA
    if (document.getElementById('sticky-cta')) {
        console.log('📌 Sticky CTA disponível');
    }
    
    // Inicializar formulários com validação
    if (document.querySelector('[data-validate-form]')) {
        console.log('📝 Formulários com validação disponíveis');
    }
    
    // Adicionar classe para animações
    document.body.classList.add('loaded');
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Detectar se é mobile para otimizações
function isMobile() {
    return window.innerWidth <= 768;
}

// Adicionar classe no body para CSS condicional
if (isMobile()) {
    document.body.classList.add('is-mobile');
}

window.addEventListener('resize', function() {
    if (isMobile()) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.remove('is-mobile');
    }
});

// Performance: lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ Mente & Dados - Todos os sistemas inicializados');
