/**
 * Mente & Dados - Form Validation Component
 * Versão: 1.0.0
 * 
 * Funcionalidades:
 * - Validação de campos em tempo real
 * - Feedback visual de erro/sucesso
 * - Máscaras para telefone, CPF, etc.
 * - Submit com prevenção de duplicação
 */

class FormValidator {
  constructor(form, options = {}) {
    this.form = form;
    this.options = {
      validateOnInput: true,     // Validar enquanto digita
      validateOnBlur: true,      // Validar ao sair do campo
      showErrorsInline: true,    // Mostrar erros abaixo do campo
      errorClass: 'form-error',   // Classe para mensagens de erro
      successClass: 'form-success', // Classe para campos válidos
      ...options
    };
    
    this.fields = [];
    this.isSubmitting = false;
    this.init();
  }
  
  init() {
    if (!this.form) {
      console.error('FormValidator: Form não encontrado');
      return;
    }
    
    // Encontrar todos os campos com validação
    const inputs = this.form.querySelectorAll('[data-validate], [required]');
    
    inputs.forEach(input => {
      const rules = this.getRules(input);
      if (rules.length > 0) {
        this.fields.push({ input, rules });
        this.setupFieldListeners(input);
      }
    });
    
    // Configurar submit
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Adicionar estilos CSS para validação
    this.injectStyles();
  }
  
  getRules(input) {
    const rules = [];
    
    // Regra: required
    if (input.hasAttribute('required') || input.getAttribute('data-validate')?.includes('required')) {
      rules.push({ name: 'required', validate: (value) => value.trim() !== '' });
    }
    
    // Regra: email
    if (input.type === 'email' || input.getAttribute('data-validate')?.includes('email')) {
      rules.push({ 
        name: 'email', 
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      });
    }
    
    // Regra: minlength
    const minlength = input.getAttribute('minlength') || input.getAttribute('data-minlength');
    if (minlength) {
      rules.push({ 
        name: 'minlength', 
        validate: (value) => value.length >= parseInt(minlength)
      });
    }
    
    // Regra: maxlength
    const maxlength = input.getAttribute('maxlength') || input.getAttribute('data-maxlength');
    if (maxlength) {
      rules.push({ 
        name: 'maxlength', 
        validate: (value) => value.length <= parseInt(maxlength)
      });
    }
    
    // Regra: pattern
    const pattern = input.getAttribute('pattern');
    if (pattern) {
      const regex = new RegExp(pattern);
      rules.push({ name: 'pattern', validate: (value) => regex.test(value) });
    }
    
    // Regra: telefone (Brasil)
    if (input.getAttribute('data-validate')?.includes('phone')) {
      rules.push({
        name: 'phone',
        validate: (value) => /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/.test(value)
      });
    }
    
    // Regra: CPF
    if (input.getAttribute('data-validate')?.includes('cpf')) {
      rules.push({ name: 'cpf', validate: (value) => this.validateCPF(value) });
    }
    
    return rules;
  }
  
  validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Eliminar CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validar primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    // Validar segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    return digit === parseInt(cpf.charAt(10));
  }
  
  setupFieldListeners(input) {
    if (this.options.validateOnInput) {
      input.addEventListener('input', () => this.validateField(input));
    }
    
    if (this.options.validateOnBlur) {
      input.addEventListener('blur', () => this.validateField(input));
    }
    
    // Máscaras para campos específicos
    if (input.getAttribute('data-mask') === 'phone') {
      input.addEventListener('input', (e) => this.maskPhone(e.target));
    }
    
    if (input.getAttribute('data-mask') === 'cpf') {
      input.addEventListener('input', (e) => this.maskCPF(e.target));
    }
  }
  
  validateField(input) {
    const fieldData = this.fields.find(f => f.input === input);
    if (!fieldData) return true;
    
    const value = input.value;
    let isValid = true;
    let errorMessage = '';
    
    // Validar todas as regras
    for (const rule of fieldData.rules) {
      if (!rule.validate(value)) {
        isValid = false;
        errorMessage = this.getErrorMessage(rule.name, input);
        break;
      }
    }
    
    // Atualizar UI
    this.updateFieldUI(input, isValid, errorMessage);
    
    return isValid;
  }
  
  getErrorMessage(ruleName, input) {
    const messages = {
      required: 'Este campo é obrigatório',
      email: 'Digite um email válido (ex: nome@email.com)',
      minlength: `Mínimo de ${input.getAttribute('minlength')} caracteres`,
      maxlength: `Máximo de ${input.getAttribute('maxlength')} caracteres`,
      pattern: 'Formato inválido',
      phone: 'Digite um telefone válido (ex: (11) 99999-9999)',
      cpf: 'Digite um CPF válido'
    };
    
    const customMessage = input.getAttribute(`data-error-${ruleName}`);
    return customMessage || messages[ruleName] || 'Campo inválido';
  }
  
  updateFieldUI(input, isValid, errorMessage) {
    // Remover classes antigas
    input.classList.remove('is-valid', 'is-invalid');
    
    // Remover mensagem de erro existente
    const existingError = input.parentElement?.querySelector(`.${this.options.errorClass}`);
    if (existingError) existingError.remove();
    
    if (isValid) {
      input.classList.add('is-valid');
      
      // Adicionar feedback de sucesso se tiver valor
      if (input.value.trim() !== '') {
        // Opcional: adicionar ícone de check
      }
    } else {
      input.classList.add('is-invalid');
      
      // Adicionar mensagem de erro
      if (this.options.showErrorsInline && errorMessage) {
        const errorDiv = document.createElement('div');
        errorDiv.className = this.options.errorClass;
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = 'var(--error)';
        errorDiv.style.fontSize = 'var(--text-sm)';
        errorDiv.style.marginTop = 'var(--space-1)';
        
        input.insertAdjacentElement('afterend', errorDiv);
      }
    }
  }
  
  maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length <= 2) {
      input.value = value;
    } else if (value.length <= 6) {
      input.value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    } else {
      input.value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    }
  }
  
  maskCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length <= 3) {
      input.value = value;
    } else if (value.length <= 6) {
      input.value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    } else if (value.length <= 9) {
      input.value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      input.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  }
  
  validateAll() {
    let isValid = true;
    for (const field of this.fields) {
      const fieldIsValid = this.validateField(field.input);
      if (!fieldIsValid) isValid = false;
    }
    return isValid;
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    const isValid = this.validateAll();
    
    if (isValid) {
      this.isSubmitting = true;
      
      // Disparar evento personalizado
      const event = new CustomEvent('form:valid-submit', {
        detail: { form: this.form, values: this.getFormValues() }
      });
      document.dispatchEvent(event);
      
      // Se for um formulário normal, submit
      if (this.form.hasAttribute('action') && !event.defaultPrevented) {
        try {
          // Aqui você pode adicionar fetch para enviar dados
          console.log('Formulário válido:', this.getFormValues());
          // this.form.submit(); // Descomentar para submit real
        } catch (error) {
          console.error('Erro ao submeter formulário:', error);
        }
      }
      
      this.isSubmitting = false;
    } else {
      // Scroll para o primeiro erro
      const firstInvalid = this.form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      
      // Disparar evento de erro
      const event = new CustomEvent('form:invalid-submit', {
        detail: { form: this.form }
      });
      document.dispatchEvent(event);
    }
  }
  
  getFormValues() {
    const values = {};
    const formData = new FormData(this.form);
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    return values;
  }
  
  injectStyles() {
    if (document.querySelector('#form-validator-styles')) return;
    
    const styles = `
      <style id="form-validator-styles">
        .is-valid {
          border-color: var(--success) !important;
          background-color: var(--success-bg) !important;
        }
        .is-invalid {
          border-color: var(--error) !important;
          background-color: var(--error-bg) !important;
        }
        .form-error {
          color: var(--error);
          font-size: var(--text-sm);
          margin-top: var(--space-1);
          animation: fadeIn var(--transition-fast);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
  }
}

// Inicializar automaticamente formulários com data-validate-form
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('[data-validate-form]');
  forms.forEach(form => {
    new FormValidator(form);
  });
});

// Exportar para uso global
window.FormValidator = FormValidator;
