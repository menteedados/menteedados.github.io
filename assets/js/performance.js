/**
 * Mente & Dados - Performance Mobile
 * Otimizações para dispositivos móveis
 * Versão: 1.0.0
 */

class MobilePerformance {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }
  
  init() {
    // Otimizações específicas para mobile
    if (this.isMobile) {
      this.optimizeForMobile();
    }
    
    // Detectar conexão lenta
    this.detectSlowConnection();
    
    // Otimizar imagens
    this.optimizeImages();
    
    // Lazy loading aprimorado
    this.setupLazyLoading();
    
    // Prevenir zoom em inputs no iOS
    this.preventIOSZoom();
    
    // Otimizar scroll
    this.optimizeScroll();
    
    // Adicionar classe no html
    document.documentElement.classList.add('js-loaded');
  }
  
  optimizeForMobile() {
    // Remover animações desnecessárias em mobile
    if (this.prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }
    
    // Simplificar hover effects
    document.body.classList.add('touch-device');
    
    // Otimizar touch events
    this.optimizeTouchEvents();
  }
  
  detectSlowConnection() {
    // Detectar conexão lenta via Network Information API
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const slowConnection = connection.saveData || 
                            connection.effectiveType === 'slow-2g' ||
                            connection.effectiveType === '2g';
      
      if (slowConnection) {
        document.body.classList.add('slow-connection');
        // Desabilitar carregamento de recursos pesados
        this.disableHeavyResources();
      }
    }
  }
  
  disableHeavyResources() {
    // Impedir carregamento de imagens desnecessárias
    const heavyImages = document.querySelectorAll('img[data-heavy]');
    heavyImages.forEach(img => {
      img.style.display = 'none';
    });
  }
  
  optimizeImages() {
    // Converter imagens para WebP quando suportado
    const supportsWebP = this.checkWebPSupport();
    
    if (supportsWebP) {
      document.querySelectorAll('img[data-webp]').forEach(img => {
        const webpSrc = img.getAttribute('data-webp');
        if (webpSrc) {
          img.src = webpSrc;
        }
      });
    }
  }
  
  checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, 1, 1);
    return imageData !== null;
  }
  
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const lazyBackgrounds = document.querySelectorAll('[data-background]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px', // Carregar 50px antes de entrar na tela
        threshold: 0.01
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
      lazyBackgrounds.forEach(bg => imageObserver.observe(bg));
    } else {
      // Fallback para navegadores antigos
      this.loadImagesImmediately();
    }
  }
  
  loadImagesImmediately() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.classList.add('loaded');
    });
  }
  
  preventIOSZoom() {
    // Prevenir zoom em inputs no iOS (já está no CSS com font-size: 16px)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('touchstart', function() {
        this.style.fontSize = '16px';
      });
    });
  }
  
  optimizeScroll() {
    let ticking = false;
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
          
          // Disparar evento de direção do scroll
          const event = new CustomEvent('scroll-direction', {
            detail: { direction: scrollDirection, scrollY: currentScrollY }
          });
          document.dispatchEvent(event);
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  optimizeTouchEvents() {
    // Remover delay de 300ms em touch events (já resolvido em navegadores modernos)
    // Melhorar resposta ao toque
    const touchElements = document.querySelectorAll('button, .btn, a, .faq-question');
    
    touchElements.forEach(el => {
      el.addEventListener('touchstart', () => {
        // Adicionar feedback tátil
        el.classList.add('touch-active');
        setTimeout(() => {
          el.classList.remove('touch-active');
        }, 150);
      });
    });
  }
  
  // Verificar se é dispositivo mobile real (não apenas largura)
  static isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Verificar se é iOS
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  
  // Verificar se é Android
  static isAndroid() {
    return /Android/.test(navigator.userAgent);
  }
}

// Inicializar otimizações mobile
document.addEventListener('DOMContentLoaded', () => {
  window.mobilePerformance = new MobilePerformance();
});

// Exportar para uso global
window.MobilePerformance = MobilePerformance;