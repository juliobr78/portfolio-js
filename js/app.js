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
    document.getElementById('year').textContent = new Date().getFullYear();
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
    // Delegação para links SPA
    document.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (a) {
        const href = a.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const page = href.replace('#','');
          this.navigate(page);
        }
      }
    });

    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
      });
    }

    document.addEventListener('click', (e) => {
      const mobileLink = e.target.closest('.nav-mobile-link');
      if (mobileLink && hamburger) {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
      }
    });
  },
  initSPA() {
    window.addEventListener('hashchange', () => {
      const page = window.location.hash.replace('#','') || 'home';
      this.navigate(page);
    });
    const initialPage = window.location.hash.replace('#','') || 'home';
    this.navigate(initialPage);
  },
  navigate(page) {
    if (!this.pages[page]) {
      console.warn(`Página "${page}" não encontrada`);
      return;
    }
    this.currentPage = page;
    window.location.hash = page;
    document.title = `${this.pages[page].title} - Julio Cesar Vieira`;
    this.renderPage(page);
    this.updateActiveMenu(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  renderPage(page) {
    const mainContent = document.querySelector('main');
    mainContent.style.opacity = '0';
    setTimeout(() => {
      if (this.pages[page] && this.pages[page].render) {
        this.pages[page].render();
      }
      mainContent.style.transition = 'opacity 0.25s ease';
      mainContent.style.opacity = '1';
      // inicializa validação (caso exista formulário)
      FormValidator.init();
      ProjectsManager.renderList();
    }, 120);
  },
  updateActiveMenu(page) {
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${page}`) link.classList.add('active');
      else link.classList.remove('active');
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
      const data = localStorage.getItem('userData');
      if (data) return JSON.parse(data);
    } catch (err) { console.error('Erro ao carregar storage', err); }
    return null;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
