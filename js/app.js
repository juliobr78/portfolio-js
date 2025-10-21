/* ============================================
   APP.JS - SISTEMA PRINCIPAL DA APLICAÇÃO
   Single Page Application (SPA) básico
============================================ */

// ==================== CONFIGURAÇÃO GLOBAL ====================
const App = {
  currentPage: 'home',
  pages: {},
  
  // Inicializar aplicação
  init() {
    console.log('🚀 Aplicação iniciada!');
    this.loadPages();
    this.setupEventListeners();
    this.initSPA();
    this.loadFromStorage();
  },
  
  // Carregar páginas do SPA
  loadPages() {
    this.pages = {
      home: {
        title: 'Home',
        render: Templates.renderHome
      },
      projetos: {
        title: 'Projetos',
        render: Templates.renderProjetos
      },
      sobre: {
        title: 'Sobre',
        render: Templates.renderSobre
      },
      contato: {
        title: 'Contato',
        render: Templates.renderContato
      }
    };
  },
  
  // Configurar listeners de eventos
  setupEventListeners() {
    // Navegação SPA
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = e.target.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const page = href.replace('#', '');
          this.navigate(page);
        }
      });
    });
    
    // Menu hambúrguer
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
      });
    }
    
    // Fechar menu mobile ao clicar em link
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger) {
          hamburger.classList.remove('active');
          navMobile.classList.remove('active');
        }
      });
    });
    
    // Smooth scroll
    this.setupSmoothScroll();
  },
  
  // Inicializar Single Page Application
  initSPA() {
    // Detectar mudança de hash na URL
    window.addEventListener('hashchange', () => {
      const page = window.location.hash.replace('#', '') || 'home';
      this.navigate(page);
    });
    
    // Carregar página inicial
    const initialPage = window.location.hash.replace('#', '') || 'home';
    this.navigate(initialPage);
  },
  
  // Navegar entre páginas (SPA)
  navigate(page) {
    if (!this.pages[page]) {
      console.warn(`Página "${page}" não encontrada`);
      return;
    }
    
    console.log(`📄 Navegando para: ${page}`);
    this.currentPage = page;
    
    // Atualizar URL
    window.location.hash = page;
    
    // Atualizar título
    document.title = `${this.pages[page].title} - Meu Portfólio`;
    
    // Renderizar página
    this.renderPage(page);
    
    // Atualizar menu ativo
    this.updateActiveMenu(page);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  
  // Renderizar página atual
  renderPage(page) {
    const mainContent = document.querySelector('main') || document.body;
    
    // Animação de fade out
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
      // Renderizar conteúdo
      if (this.pages[page] && this.pages[page].render) {
        this.pages[page].render();
      }
      
      // Animação de fade in
      mainContent.style.transition = 'opacity 0.3s ease';
      mainContent.style.opacity = '1';
    }, 150);
  },
  
  // Atualizar menu ativo
  updateActiveMenu(page) {
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${page}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },
  
  // Smooth scroll
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  },
  
  // Salvar dados no localStorage
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`💾 Dados salvos: ${key}`);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  },
  
  // Carregar dados do localStorage
  loadFromStorage() {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        console.log('📦 Dados carregados:', data);
        return data;
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
    return null;
  },
  
  // Limpar dados do localStorage
  clearStorage() {
    localStorage.clear();
    console.log('🗑️ Dados limpos');
  }
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  FormValidator.init();
  Modal.init();
  Alert.init();
  ProjectsManager.init();
});

// ==================== UTILITÁRIOS ====================
const Utils = {
  // Formatar data
  formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  },
  
  // Validar email
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Validar telefone
  isValidPhone(phone) {
    const regex = /^\(?[1-9]{2}\)?\s?9?[0-9]{4}-?[0-9]{4}$/;
    return regex.test(phone);
  },
  
  // Capitalizar primeira letra
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  // Gerar ID único
  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  },
  
  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};
