/* app.js - SPA principal */
const App = {
  currentPage: 'home',
  pages: {},
  init() {
    console.log('🚀 Aplicação iniciada!');
    this.loadPages();
    this.setupEventListeners();
    this.initSPA();
    this.loadFromStorage();
  },
  loadPages() {
    this.pages = {
      home: { title: 'Home', render: Templates.renderHome },
      projetos: { title: 'Projetos', render: Templates.renderProjetos },
      sobre: { title: 'Sobre', render: Templates.renderSobre },
      contato: { title: 'Contato', render: Templates.renderContato }
    };
  },
  setupEventListeners() {
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
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
      });
    }
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger) {
          hamburger.classList.remove('active');
          navMobile.classList.remove('active');
        }
      });
    });
    this.setupSmoothScroll();
  },
  initSPA() {
    window.addEventListener('hashchange', () => {
      const page = window.location.hash.replace('#', '') || 'home';
      this.navigate(page);
    });
    const initialPage = window.location.hash.replace('#', '') || 'home';
    this.navigate(initialPage);
  },
  navigate(page) {
    if (!this.pages[page]) {
      console.warn(`Página "${page}" não encontrada`);
      return;
    }
    console.log(`📄 Navegando para: ${page}`);
    this.currentPage = page;
    window.location.hash = page;
    document.title = `${this.pages[page].title} - Meu Portfólio`;
    this.renderPage(page);
    this.updateActiveMenu(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  renderPage(page) {
    const mainContent = document.querySelector('main') || document.body;
    mainContent.style.opacity = '0';
    setTimeout(() => {
      if (this.pages[page] && this.pages[page].render) {
        this.pages[page].render();
      }
      mainContent.style.transition = 'opacity 0.3s ease';
      mainContent.style.opacity = '1';
      // Inicializar validador caso formulário apareça
      FormValidator.init();
    }, 150);
  },
  updateActiveMenu(page) {
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${page}`) link.classList.add('active');
      else link.classList.remove('active');
    });
  },
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
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`💾 Dados salvos: ${key}`);
    } catch (error) { console.error('Erro ao salvar dados:', error); }
  },
  loadFromStorage() {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        console.log('📦 Dados carregados:', data);
        return data;
      }
    } catch (error) { console.error('Erro ao carregar dados:', error); }
    return null;
  },
  clearStorage() { localStorage.clear(); console.log('🗑️ Dados limpos'); }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
  // as outras iniciais permanecem dentro de cada módulo
});
