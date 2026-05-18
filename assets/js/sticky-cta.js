/**
 * Mente & Dados - Sticky CTA Component
 * Versão: 1.0.0
 * 
 * Funcionalidades:
 * - Aparece após scroll do usuário
 * - Detecta quando usuário sai do elemento de interesse
 * - Configurável (thresholds, elementos de referência)
 * - Exit-intent detection (opcional)
 */

class StickyCTA {
  constructor(options = {}) {
    this.options = {
      selector: '#sticky-cta',           // Seletor do elemento CTA
      showAfter: 300,                     // Mostrar após X pixels scroll
      showAfterElement: null,             // Mostrar após passar deste elemento
      hideAtFooter: true,                 // Esconder ao chegar no footer
      footerSelector: '.footer',          // Seletor do footer
      animationDuration: 300,             // Duração da animação (ms)
      debug: false,                        // Modo debug (logs no console)
      ...options
    };
    
    this.cta = null;
    this.footer = null;
    this.isVisible = false;
    this.animationFrame = null;
    this.observedElement = null;
    
    this.init();
  }
  
  init() {
    // Encontrar elemento CTA
    this.cta = document.querySelector(this.options.selector);
    
    if (!this.cta) {
      if (this.options.debug) {
        console.warn('StickyCTA: Elemento não encontrado:', this.options.selector);
      }
      return;
    }
    
    // Configurar estilo inicial
    this.cta.style.transition = `all ${this.options.animationDuration}ms ease-in-out`;
    this.cta.style.opacity = '0';
    this.cta.style.transform = 'translateX(100%)';
    this.cta.style.visibility = 'hidden';
    
    // Encontrar footer
    this.footer = document.querySelector(this.options.footerSelector);
    
    // Configurar scroll listener
    this.setupScrollListener();
    
    // Configurar resize listener
    window.addEventListener('resize', () => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.animationFrame = requestAnimationFrame(() => this.checkVisibility());
    });
    
    if (this.options.debug) {
      console.log('StickyCTA: Inicializado');
    }
  }
  
  setupScrollListener() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Verificar imediatamente
    this.checkVisibility();
  }
  
  checkVisibility() {
    if (!this.cta) return;
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let shouldShow = false;
    
    // Verificar threshold por scroll position
    if (this.options.showAfterElement) {
      // Mostrar após passar de um elemento específico
      const targetElement = document.querySelector(this.options.showAfterElement);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + scrollY;
        shouldShow = scrollY > elementPosition - windowHeight / 2;
      }
    } else {
      // Mostrar após scroll simples
      shouldShow = scrollY > this.options.showAfter;
    }
    
    // Verificar se está perto do footer
    if (this.options.hideAtFooter && this.footer) {
      const footerPosition = this.footer.getBoundingClientRect().top;
      const distanceToFooter = documentHeight - (scrollY + windowHeight);
      
      if (footerPosition < windowHeight) {
        shouldShow = false;
      }
    }
    
    // Aplicar visibilidade
    if (shouldShow && !this.isVisible) {
      this.show();
    } else if (!shouldShow && this.isVisible) {
      this.hide();
    }
    
    // Log para debug
    if (this.options.debug) {
      console.log('StickyCTA:', {
        scrollY,
        shouldShow,
        isVisible: this.isVisible,
        showAfter: this.options.showAfter
      });
    }
  }
  
  show() {
    if (!this.cta || this.isVisible) return;
    
    this.cta.style.visibility = 'visible';
    this.cta.style.opacity = '1';
    this.cta.style.transform = 'translateX(0)';
    this.isVisible = true;
    
    // Disparar evento
    const event = new CustomEvent('sticky-cta:show', {
      detail: { cta: this.cta }
    });
    document.dispatchEvent(event);
    
    if (this.options.debug) {
      console.log('StickyCTA: Mostrado');
    }
  }
  
  hide() {
    if (!this.cta || !this.isVisible) return;
    
    this.cta.style.opacity = '0';
    this.cta.style.transform = 'translateX(100%)';
    
    // Esperar animação terminar para esconder completamente
    setTimeout(() => {
      if (!this.isVisible) {
        this.cta.style.visibility = 'hidden';
      }
    }, this.options.animationDuration);
    
    this.isVisible = false;
    
    // Disparar evento
    const event = new CustomEvent('sticky-cta:hide', {
      detail: { cta: this.cta }
    });
    document.dispatchEvent(event);
    
    if (this.options.debug) {
      console.log('StickyCTA: Escondido');
    }
  }
  
  // Método público para destruir o componente
  destroy() {
    if (this.cta) {
      this.cta.style.transition = '';
      this.cta.style.opacity = '';
      this.cta.style.transform = '';
      this.cta.style.visibility = '';
    }
    
    window.removeEventListener('scroll', this.checkVisibility);
    window.removeEventListener('resize', this.checkVisibility);
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Inicializar automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#sticky-cta')) {
    window.stickyCTA = new StickyCTA({
      showAfter: 600,           // Mostrar após 600px de scroll
      showAfterElement: '.product-hero', // Mostrar após passar do hero
      hideAtFooter: true,       // Esconder ao chegar no footer
      debug: false              // Desativar debug em produção
    });
  }
});

// Exportar para uso global
window.StickyCTA = StickyCTA;
