/* ============================================
   COMPONENTS.JS - COMPONENTES INTERATIVOS
   Modal, Alert, Gerenciador de Projetos
============================================ */

// ==================== MODAL ====================
const Modal = {
  modalElement: null,
  
  init() {
    this.createModal();
  },
  
  createModal() {
    if (document.getElementById('dynamicModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'dynamicModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="Modal.close()">&times;</button>
        <h3 id="modalTitle"></h3>
        <p id="modalMessage"></p>
        <button class="btn btn-primary" onclick="Modal.close()">Fechar</button>
      </div>
    `;
    document.body.appendChild(modal);
    this.modalElement = modal;
  },
  
  open(title, message) {
    if (!this.modalElement) this.createModal();
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    this.modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    if (this.modalElement) {
      this.modalElement.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// ==================== ALERT ====================
const Alert = {
  alertElement: null,
  timeout: null,
  
  init() {
    this.createAlert();
  },
  
  createAlert() {
    if (document.getElementById('dynamicAlert')) return;
    
    const alert = document.createElement('div');
    alert.id = 'dynamicAlert';
    alert.className = 'alert alert-info';
    alert.style.display = 'none';
    alert.innerHTML = `
      <span class="alert-icon"></span>
      <div class="alert-content">
        <strong class="alert-title"></strong>
        <span class="alert-message"></span>
      </div>
      <button class="alert-close" onclick="Alert.close()">&times;</button>
    `;
    document.body.appendChild(alert);
    this.alertElement = alert;
  },
  
  show(title, message, type = 'info') {
    if (!this.alertElement) this.createAlert();
    
    // Limpar timeout anterior
    if (this.timeout) clearTimeout(this.timeout);
    
    // Definir tipo
    this.alertElement.className = `alert alert-${type}`;
    
    // Definir ícone
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    this.alertElement.querySelector('.alert-icon').textContent = icons[type] || icons.info;
    this.alertElement.querySelector('.alert-title').textContent = title;
    this.alertElement.querySelector('.alert-message').textContent = message;
    
    // Mostrar
    this.alertElement.style.display = 'flex';
    
    // Auto-fechar após 5 segundos
    this.timeout = setTimeout(() => this.close(), 5000);
  },
  
  close() {
    if (this.alertElement) {
      this.alertElement.style.display = 'none';
    }
  }
};

// ==================== GERENCIADOR DE PROJETOS ====================
const ProjectsManager = {
  projects: [],
  
  init() {
    this.loadProjects();
    console.log('📂 Gerenciador de projetos iniciado');
  },
  
  loadProjects() {
    // Carregar do localStorage ou usar padrão
    const saved = localStorage.getItem('projects');
    if (saved) {
      this.projects = JSON.parse(saved);
    } else {
      this.projects = this.getDefaultProjects();
      this.saveProjects();
    }
  },
  
  getDefaultProjects() {
    return [
      {
        id: 'proj1',
        title: 'Projeto A - Landing Page',
        description: 'Landing page moderna e responsiva com animações suaves',
        category: 'web',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: 'ima.1',
        color: '4f46e5',
        badge: 'Novo',
        badgeType: 'success'
      },
      {
        id: 'proj2',
        title: 'Projeto B - Dashboard',
        description: 'Dashboard interativo com gráficos e visualização de dados',
        category: 'web',
        tags: ['React', 'Chart.js', 'API'],
        image: 'ima.2',
        color: '6366f1',
        badge: 'Destaque',
        badgeType: 'warning'
      },
      {
        id: 'proj3',
        title: 'Projeto C - E-commerce',
        description: 'Plataforma de e-commerce completa com carrinho de compras',
        category: 'web',
        tags: ['Vue.js', 'Node.js', 'MongoDB'],
        image: 'placeholder.jpg',
        color: '7c3aed',
        badge: 'Popular',
        badgeType: 'info'
      },
      {
        id: 'proj4',
        title: 'App Mobile - Fitness',
        description: 'Aplicativo de acompanhamento de treinos e nutrição',
        category: 'mobile',
        tags: ['React Native', 'Firebase'],
        image: '',
        color: '22c55e',
        badge: 'Novo',
        badgeType: 'success'
      },
      {
        id: 'proj5',
        title: 'Design System',
        description: 'Sistema de design completo com componentes reutilizáveis',
        category: 'design',
        tags: ['Figma', 'Tokens', 'Documentation'],
        image: '',
        color: 'f97316',
        badge: 'Em Progresso',
        badgeType: 'warning'
      },
      {
        id: 'proj6',
        title: 'Portfolio Interativo',
        description: 'Portfolio com animações 3D e efeitos parallax',
        category: 'web',
        tags: ['Three.js', 'GSAP', 'WebGL'],
        image: '',
        color: '06b6d4',
        badge: 'Destaque',
        badgeType: 'warning'
      }
    ];
  },
  
  getProjects() {
    return this.projects;
  },
  
  saveProjects() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
    console.log('💾 Projetos salvos');
  },
  
  addProject() {
    const title = prompt('Nome do projeto:');
    if (!title) return;
    
    const description = prompt('Descrição:');
    const category = prompt('Categoria (web/mobile/design):') || 'web';
    
    const newProject = {
      id: Utils.generateId(),
      title,
      description: description || 'Sem descrição',
      category,
      tags: ['Novo'],
      image: '',
      color: '4f46e5',
      badge: 'Novo',
      badgeType: 'success'
    };
    
    this.projects.push(newProject);
    this.saveProjects();
    
    Alert.show('Sucesso', 'Projeto adicionado!', 'success');
    Templates.renderProjetos();
  },
  
  viewProject(id) {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      Modal.open(
        project.title,
        `${project.description}\n\nCategoria: ${project.category}\nTags: ${project.tags.join(', ')}`
      );
    }
  },
  
  editProject(id) {
    const project = this.projects.find(p => p.id === id);
    if (!project) return;
    
    const newTitle = prompt('Novo título:', project.title);
    if (newTitle) {
      project.title = newTitle;
      
      const newDesc = prompt('Nova descrição:', project.description);
      if (newDesc) project.description = newDesc;
      
      this.saveProjects();
      Alert.show('Sucesso', 'Projeto atualizado!', 'success');
      Templates.renderProjetos();
    }
  },
  
  deleteProject(id) {
    if (confirm('Deseja realmente excluir este projeto?')) {
      this.projects = this.projects.filter(p => p.id !== id);
      this.saveProjects();
      Alert.show('Sucesso', 'Projeto excluído!', 'success');
      Templates.renderProjetos();
    }
  }
};

// ==================== TEMA ESCURO/CLARO ====================
const ThemeToggle = {
  currentTheme: 'light',
  
  init() {
    this.loadTheme();
    this.createToggleButton();
  },
  
  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.currentTheme = saved;
      this.applyTheme(saved);
    }
  },
  
  createToggleButton() {
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
    button.onclick = () => this.toggle();
    button.setAttribute('aria-label', 'Alternar tema');
    button.title = 'Alternar tema';
    
    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = `
      .theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--color-primary-500);
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: transform 0.3s ease;
      }
      
      .theme-toggle:hover {
        transform: scale(1.1);
      }
      
      body.dark-theme {
        --color-neutral-50: #1a1a1a;
        --color-neutral-100: #2d2d2d;
        --color-neutral-900: #f3f4f6;
        background: #1a1a1a;
        color: #f3f4f6;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(button);
  },
  
  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    this.saveTheme();
    
    const button = document.getElementById('themeToggle');
    if (button) {
      button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }
  },
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  },
  
  saveTheme() {
    localStorage.setItem('theme', this.currentTheme);
  }
};

// ==================== SCROLL TO TOP ====================
const ScrollToTop = {
  button: null,
  
  init() {
    this.createButton();
    this.setupScroll();
  },
  
  createButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Voltar ao topo');
    button.title = 'Voltar ao topo';
    
    const style = document.createElement('style');
    style.textContent = `
      #scrollToTop {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--color-secondary-500);
        color: var(--color-neutral-900);
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
      }
      
      #scrollToTop.visible {
        opacity: 1;
        visibility: visible;
      }
      
      #scrollToTop:hover {
        transform: translateY(-5px);
      }
    `;
    document.head.appendChild(style);
    
    button.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    document.body.appendChild(button);
    this.button = button;
  },
  
  setupScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });
  }
};

// ==================== INICIALIZAÇÃO DOS COMPONENTES ====================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    ThemeToggle.init();
    ScrollToTop.init();
  }, 1000);
});
