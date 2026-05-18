/**
 * Mente & Dados - FAQ Accordion Component
 * Versão: 1.0.0
 * 
 * Funcionalidades:
 * - Accordion com animação suave
 * - Acessibilidade (aria-expanded, aria-controls)
 * - Teclado (Enter/Space para abrir/fechar)
 * - Suporte a múltiplos FAQs na mesma página
 */

class FAQAccordion {
  constructor(options = {}) {
    this.options = {
      selector: '.faq-item',           // Seletor dos itens FAQ
      questionSelector: '.faq-question', // Seletor da pergunta
      answerSelector: '.faq-answer',     // Seletor da resposta
      activeClass: 'active',             // Classe para estado ativo
      animationDuration: 300,            // Duração da animação (ms)
      allowMultipleOpen: false,          // Permitir múltiplos abertos
      ...options
    };
    
    this.items = [];
    this.init();
  }
  
  init() {
    // Encontrar todos os itens FAQ
    const faqItems = document.querySelectorAll(this.options.selector);
    
    if (faqItems.length === 0) {
      console.warn('FAQAccordion: Nenhum item FAQ encontrado com seletor:', this.options.selector);
      return;
    }
    
    // Inicializar cada item
    faqItems.forEach((item, index) => {
      const question = item.querySelector(this.options.questionSelector);
      const answer = item.querySelector(this.options.answerSelector);
      
      if (!question || !answer) {
        console.warn(`FAQAccordion: Item ${index} não tem pergunta ou resposta`);
        return;
      }
      
      // Configurar IDs para acessibilidade
      const itemId = `faq-item-${index}`;
      const questionId = `faq-question-${index}`;
      const answerId = `faq-answer-${index}`;
      
      if (!item.id) item.id = itemId;
      if (!question.id) question.id = questionId;
      if (!answer.id) answer.id = answerId;
      
      // Configurar ARIA attributes
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('aria-controls', answerId);
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', questionId);
      
      // Estado inicial
      answer.style.maxHeight = '0';
      answer.style.overflow = 'hidden';
      answer.style.transition = `max-height ${this.options.animationDuration}ms ease-in-out`;
      
      // Event listeners
      const toggleHandler = (e) => {
        e.preventDefault();
        this.toggleItem(item, question, answer);
      };
      
      question.addEventListener('click', toggleHandler);
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleItem(item, question, answer);
        }
      });
      
      this.items.push({ item, question, answer });
    });
    
    // Inicializar com primeiro item aberto (opcional)
    if (this.options.allowMultipleOpen === false && this.items.length > 0) {
      // Manter todos fechados inicialmente
    }
  }
  
  toggleItem(item, question, answer) {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    if (!this.options.allowMultipleOpen && !isExpanded) {
      // Fechar todos os outros itens
      this.items.forEach(i => {
        if (i.item !== item && i.question.getAttribute('aria-expanded') === 'true') {
          this.closeItem(i.item, i.question, i.answer);
        }
      });
    }
    
    if (isExpanded) {
      this.closeItem(item, question, answer);
    } else {
      this.openItem(item, question, answer);
    }
  }
  
  openItem(item, question, answer) {
    // Atualizar classes e atributos
    question.classList.add(this.options.activeClass);
    question.setAttribute('aria-expanded', 'true');
    answer.classList.add(this.options.activeClass);
    
    // Animar altura
    const fullHeight = answer.scrollHeight;
    answer.style.maxHeight = `${fullHeight}px`;
    
    // Disparar evento personalizado
    const event = new CustomEvent('faq:open', {
      detail: { item, question, answer }
    });
    document.dispatchEvent(event);
  }
  
  closeItem(item, question, answer) {
    // Remover classes e atributos
    question.classList.remove(this.options.activeClass);
    question.setAttribute('aria-expanded', 'false');
    answer.classList.remove(this.options.activeClass);
    
    // Animar fechamento
    answer.style.maxHeight = '0';
    
    // Disparar evento personalizado
    const event = new CustomEvent('faq:close', {
      detail: { item, question, answer }
    });
    document.dispatchEvent(event);
  }
  
  // Método público para abrir um FAQ específico
  open(index) {
    if (this.items[index]) {
      const { item, question, answer } = this.items[index];
      this.openItem(item, question, answer);
    }
  }
  
  // Método público para fechar um FAQ específico
  close(index) {
    if (this.items[index]) {
      const { item, question, answer } = this.items[index];
      this.closeItem(item, question, answer);
    }
  }
  
  // Método público para fechar todos
  closeAll() {
    this.items.forEach(({ item, question, answer }) => {
      if (question.getAttribute('aria-expanded') === 'true') {
        this.closeItem(item, question, answer);
      }
    });
  }
  
  // Método público para abrir todos
  openAll() {
    if (this.options.allowMultipleOpen) {
      this.items.forEach(({ item, question, answer }) => {
        if (question.getAttribute('aria-expanded') === 'false') {
          this.openItem(item, question, answer);
        }
      });
    } else {
      console.warn('FAQAccordion: allowMultipleOpen está configurado como false');
    }
  }
}

// Inicializar automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se existe algum FAQ na página
  if (document.querySelector('.faq-item')) {
    window.faqAccordion = new FAQAccordion({
      allowMultipleOpen: false, // Apenas um FAQ aberto por vez
    });
  }
});

// Exportar para uso global
window.FAQAccordion = FAQAccordion;

