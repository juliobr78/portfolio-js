/* ============================================
   FORM-VALIDATOR.JS - VALIDAÇÃO DE FORMULÁRIOS
   Sistema completo de validação com avisos ao usuário
============================================ */

const FormValidator = {
  form: null,
  fields: {},
  
  // Inicializar validador
  init() {
    console.log('📋 Validador de formulários iniciado');
    this.setupFormValidation();
  },
  
  // Configurar validação do formulário
  setupFormValidation() {
    // Aguardar carregamento do DOM
    setTimeout(() => {
      this.form = document.getElementById('contactForm');
      if (!this.form) return;
      
      console.log('✅ Formulário encontrado');
      
      // Prevenir envio padrão
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
      
      // Validação em tempo real
      this.setupRealTimeValidation();
    }, 500);
  },
  
  // Configurar validação em tempo real
  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validar ao sair do campo
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      // Limpar erro ao digitar
      input.addEventListener('input', () => {
        this.clearError(input);
      });
      
      // Validação especial para telefone
      if (input.id === 'telefone') {
        input.addEventListener('input', (e) => {
          this.formatPhone(e.target);
        });
      }
    });
  },
  
  // Validar campo individual
  validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const fieldType = field.type;
    
    // Limpar erro anterior
    this.clearError(field);
    
    // Validações específicas
    if (field.required && !fieldValue) {
      this.showError(field, 'Este campo é obrigatório');
      return false;
    }
    
    // Validar nome
    if (fieldName === 'nome') {
      if (fieldValue.length < 3) {
        this.showError(field, 'Nome deve ter pelo menos 3 caracteres');
        return false;
      }
      if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fieldValue)) {
        this.showError(field, 'Nome deve conter apenas letras');
        return false;
      }
    }
    
    // Validar email
    if (fieldType === 'email' || fieldName === 'email') {
      if (!this.isValidEmail(fieldValue)) {
        this.showError(field, 'Digite um e-mail válido');
        return false;
      }
    }
    
    // Validar telefone
    if (fieldName === 'telefone' && fieldValue) {
      if (!this.isValidPhone(fieldValue)) {
        this.showError(field, 'Digite um telefone válido: (00) 00000-0000');
        return false;
      }
    }
    
    // Validar select
    if (fieldType === 'select-one' && field.required) {
      if (!fieldValue || fieldValue === '') {
        this.showError(field, 'Selecione uma opção');
        return false;
      }
    }
    
    // Validar mensagem
    if (fieldName === 'mensagem') {
      if (fieldValue.length < 10) {
        this.showError(field, 'Mensagem deve ter pelo menos 10 caracteres');
        return false;
      }
      if (fieldValue.length > 500) {
        this.showError(field, 'Mensagem muito longa (máximo 500 caracteres)');
        return false;
      }
    }
    
    // Validar checkbox
    if (fieldType === 'checkbox' && field.required) {
      if (!field.checked) {
        this.showError(field, 'Você precisa aceitar os termos');
        return false;
      }
    }
    
    // Campo válido
    this.showSuccess(field);
    return true;
  },
  
  // Validar todos os campos
  validateAllFields() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  },
  
  // Mostrar erro
  showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Adicionar classes de erro
    field.classList.add('error');
    field.classList.remove('success');
    
    // Mostrar mensagem
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      errorElement.style.color = '#ef4444';
    }
    
    // Shake animation
    field.style.animation = 'shake 0.3s';
    setTimeout(() => {
      field.style.animation = '';
    }, 300);
  },
  
  // Mostrar sucesso
  showSuccess(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Adicionar classe de sucesso
    field.classList.remove('error');
    field.classList.add('success');
    
    // Esconder mensagem de erro
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  },
  
  // Limpar erro
  clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    field.classList.remove('error');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  },
  
  // Validar email
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Validar telefone
  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  },
  
  // Formatar telefone
  formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, '($1');
    }
    
    input.value = value;
  },
  
  // Lidar com envio do formulário
  handleSubmit(e) {
    e.preventDefault();
    
    console.log('📤 Enviando formulário...');
    
    // Validar todos os campos
    if (!this.validateAllFields()) {
      Alert.show('Erro', 'Por favor, corrija os erros no formulário', 'error');
      
      // Focar no primeiro campo com erro
      const firstError = this.form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    // Coletar dados do formulário
    const formData = new FormData(this.form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    console.log('📦 Dados do formulário:', data);
    
    // Salvar no localStorage
    this.saveFormData(data);
    
    // Simular envio (delay)
    this.showLoading();
    
    setTimeout(() => {
      this.hideLoading();
      Modal.open('Mensagem Enviada!', 'Obrigado pelo contato. Responderemos em breve!');
      this.form.reset();
      this.clearAllErrors();
      
      // Mostrar alerta de sucesso
      Alert.show('Sucesso', 'Formulário enviado com sucesso!', 'success');
    }, 1500);
  },
  
  // Salvar dados do formulário
  saveFormData(data) {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: Utils.generateId()
    });
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    console.log('💾 Dados salvos no localStorage');
  },
  
  // Mostrar loading
  showLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Enviando...';
    }
  },
  
  // Esconder loading
  hideLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar Mensagem';
    }
  },
  
  // Limpar todos os erros
  clearAllErrors() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      this.clearError(input);
      input.classList.remove('success');
    });
  }
};

// CSS para animação de shake
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .form-input.error,
  .form-textarea.error,
  .form-select.error {
    border-color: #ef4444 !important;
  }
  
  .form-input.success,
  .form-textarea.success,
  .form-select.success {
    border-color: #22c55e !important;
  }
  
  .error-message {
    display: none;
    color: #ef4444;
    font-size: 0.875rem;
