/**
 * Lazy Loading Otimizado - Mente & Dados
 * Carrega imagens e recursos sob demanda
 */

class LazyLoader {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      this.setupLazyImages();
      this.setupLazyBackgrounds();
      this.setupLazyIframes();
    } else {
      this.fallbackLoad();
    }
  }
  
  setupLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            img.src = src;
            img.classList.add('loaded');
          }
          
          if (srcset) {
            img.srcset = srcset;
          }
          
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          this.observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    images.forEach(img => this.observer.observe(img));
  }
  
  setupLazyBackgrounds() {
    const elements = document.querySelectorAll('[data-background]');
    
    elements.forEach(el => {
      this.observer.observe(el);
      
      // Fallback: quando intersectar, carregar background
      const originalObserver = this.observer.observe;
      this.observer.observe = (target) => {
        if (target.isIntersecting) {
          const bg = target.dataset.background;
          if (bg) {
            target.style.backgroundImage = `url(${bg})`;
            target.classList.add('bg-loaded');
          }
        }
        originalObserver.call(this.observer, target);
      };
    });
  }
  
  setupLazyIframes() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    
    iframes.forEach(iframe => {
      this.observer.observe(iframe);
      
      iframe.addEventListener('load', () => {
        iframe.classList.add('loaded');
      });
    });
  }
  
  fallbackLoad() {
    // Fallback para navegadores sem IntersectionObserver
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
    
    const iframes = document.querySelectorAll('iframe[data-src]');
    iframes.forEach(iframe => {
      iframe.src = iframe.dataset.src;
    });
  }
  
  // Pré-carregar imagens críticas
  preloadCritical(images) {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.lazyLoader = new LazyLoader();
});

// Exportar para uso global
window.LazyLoader = LazyLoader;
EOF
