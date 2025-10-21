/* ============================================
   TEMPLATES.JS - SISTEMA DE TEMPLATES
   Renderização dinâmica de conteúdo
============================================ */

const Templates = {
  // Renderizar página Home
  renderHome() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.innerHTML = `
        <div class="container">
          <span class="badge badge-primary">Novidade</span>
          <h1 class="hero-title">Entrega III — Interatividade e Funcionalidades</h1>
          <p class="hero-subtitle">Aplicação web dinâmica com JavaScript avançado, SPA e validação de formulários.</p>
          <div class="hero-actions">
            <a href="#projetos" class="btn btn-primary">Ver Projetos</a>
            <a href="#sobre" class="btn btn-outline">Sobre Mim</a>
          </div>
        </div>
      `;
    }
  },
  
  // Renderizar página de Projetos
  renderProjetos() {
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
      const projects = ProjectsManager.getProjects();
      const projectsHTML = projects.map(project => this.projectCard(project)).join('');
      
      projectsSection.innerHTML = `
        <div class="container">
          <h2 class="section-title">Meus Projetos</h2>
          <p class="section-subtitle">Confira alguns dos meus trabalhos mais recentes</p>
          
          <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="design">Design</button>
          </div>
          
          <div class="projects-grid" id="projectsGrid">
            ${projectsHTML}
          </div>
          
          <div class="text-center">
            <button class="btn btn-outline" onclick="ProjectsManager.addProject()">
              + Adicionar Projeto
            </button>
          </div>
        </div>
      `;
      
      // Ativar filtros
      this.setupProjectFilters();
    }
  },
  
  // Card de projeto
  projectCard(project) {
    return `
      <div class="card" data-category="${project.category}">
        <div class="card-image">
          <img src="${project.image}" alt="${project.title}" 
               onerror="this.src='https://via.placeholder.com/400x300/${project.color}/ffffff?text=${project.title}'">
          <span class="badge badge-${project.badgeType} card-badge">${project.badge}</span>
        </div>
        <div class="card-body">
          <div class="card-tags">
            ${project.tags.map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
          </div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-text">${project.description}</p>
          <div class="card-actions">
            <button class="btn btn-small btn-primary" onclick="ProjectsManager.viewProject('${project.id}')">
              Ver Detalhes
            </button>
            <button class="btn btn-small btn-outline" onclick="ProjectsManager.editProject('${project.id}')">
              Editar
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  // Renderizar página Sobre
  renderSobre() {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      aboutSection.innerHTML = `
        <div class="container">
          <h2 class="section-title">Sobre Mim</h2>
          <p class="about-text">
            Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por criar 
            interfaces modernas e funcionais. Este site foi desenvolvido com HTML5, CSS3 e 
            JavaScript puro, demonstrando conceitos avançados de programação web.
          </p>
          
          <div class="skills-grid">
            <div class="skill-card">
              <h4>HTML5</h4>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 90%"></div>
              </div>
              <p class="skill-percentage">90%</p>
            </div>
            <div class="skill-card">
              <h4>CSS3</h4>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 85%"></div>
              </div>
              <p class="skill-percentage">85%</p>
            </div>
            <div class="skill-card">
              <h4>JavaScript</h4>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 80%"></div>
              </div>
              <p class="skill-percentage">80%</p>
            </div>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <h3 class="stat-number" data-target="15">0</h3>
              <p class="stat-label">Projetos Concluídos</p>
            </div>
            <div class="stat-card">
              <h3 class="stat-number" data-target="2">0</h3>
              <p class="stat-label">Anos de Experiência</p>
            </div>
            <div class="stat-card">
              <h3 class="stat-number" data-target="100">0</h3>
              <p class="stat-label">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      `;
      
      // Animar números
      this.animateStats();
    }
  },
  
  // Renderizar página de Contato
  renderContato() {
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      contactSection.innerHTML = `
        <div class="container">
          <h2 class="section-title">Entre em Contato</h2>
          <p class="section-subtitle">Tem algum projeto em mente? Vamos conversar!</p>
          
          <form class="contact-form" id="contactForm" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="nome">Nome Completo *</label>
                <input type="text" id="nome" name="nome" required class="form-input" 
                       placeholder="Digite seu nome completo">
                <span class="error-message"></span>
              </div>
              
              <div class="form-group">
                <label for="email">E-mail *</label>
                <input type="email" id="email" name="email" required class="form-input"
                       placeholder="seu@email.com">
                <span class="error-message"></span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="telefone">Telefone</label>
                <input type="tel" id="telefone" name="telefone" class="form-input"
                       placeholder="(00) 00000-0000">
                <span class="error-message"></span>
              </div>
              
              <div class="form-group">
                <label for="assunto">Assunto *</label>
                <select id="assunto" name="assunto" required class="form-select">
                  <option value="">Selecione um assunto</option>
                  <option value="projeto">Novo Projeto</option>
                  <option value="duvida">Dúvida</option>
                  <option value="parceria">Parceria</option>
                  <option value="outro">Outro</option>
                </select>
                <span class="error-message"></span>
              </div>
            </div>

            <div class="form-group">
              <label for="mensagem">Mensagem *</label>
              <textarea id="mensagem" name="mensagem" rows="5" required class="form-textarea"
                        placeholder="Digite sua mensagem aqui..."></textarea>
              <span class="error-message"></span>
              <small class="form-hint">Mínimo de 10 caracteres</small>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="termos" name="termos" required>
                <span>Aceito os termos e condições *</span>
              </label>
              <span class="error-message"></span>
            </div>

            <button type="submit" class="btn btn-primary btn-large">
              Enviar Mensagem
            </button>
          </form>
        </div>
      `;
    }
  },
  
  // Configurar filtros de projetos
  setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .card');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Atualizar botão ativo
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filtrar projetos
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },
  
  // Animar estatísticas
  animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCount();
    });
  }
};
