const Templates = {
  renderHome() {
    document.querySelector('main').innerHTML = `
      <section class="hero">
        <div class="left">
          <h1 class="h1">Olá, eu sou <strong>Julio Cesar Vieira</strong></h1>
          <p class="lead">Estudante de desenvolvimento web — criando interfaces modernas e experiências agradáveis.</p>
          <div class="cta">
            <a class="btn" href="#projetos">Ver projetos</a>
            <a class="btn" href="#contato" style="margin-left:10px; opacity:0.95">Contato</a>
          </div>
        </div>
        <div class="right" aria-hidden="true">
          <!-- Simple SVG illustration -->
          <svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="220" height="140" rx="12" fill="url(#g1)"/>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stop-color="#60a5fa" stop-opacity="0.95"/>
                <stop offset="1" stop-color="#6ee7b7" stop-opacity="0.95"/>
              </linearGradient>
            </defs>
            <g fill="#022" font-weight="700" font-family="Arial">
              <text x="20" y="75" font-size="20">Meu Portfólio</text>
            </g>
          </svg>
        </div>
      </section>
      <section>
        <h2>Sobre</h2>
        <p>Sou estudante e estou aprendendo front-end e JavaScript. Aqui você verá projetos práticos feitos durante o curso.</p>
      </section>
    `;
  },
  renderProjetos() {
    document.querySelector('main').innerHTML = `
      <section>
        <h2>Projetos</h2>
        <div class="projects-grid" id="projectsGrid"></div>
        <div style="margin-top:12px">
          <button id="addSample" class="btn">Adicionar projeto exemplo</button>
        </div>
      </section>
    `;
    document.getElementById('addSample').addEventListener('click', () => {
      ProjectsManager.addSampleProject();
      ProjectsManager.renderList();
    });
  },
  renderSobre() {
    document.querySelector('main').innerHTML = `
      <section>
        <h2>Sobre mim</h2>
        <p>Meu nome é <strong>Julio Cesar Vieira</strong>. Estou estudando programação e construindo este portfólio como projeto prático.</p>
      </section>
    `;
  },
  renderContato() {
    document.querySelector('main').innerHTML = `
      <section>
        <h2>Contato</h2>
        <form id="contactForm">
          <label for="nome">Nome</label>
          <input id="nome" name="nome" type="text" placeholder="Seu nome" required>
          <label for="email">E-mail</label>
          <input id="email" name="email" type="email" placeholder="seu@exemplo.com" required>
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows="5" placeholder="Escreva sua mensagem"></textarea>
          <button type="submit">Enviar mensagem</button>
        </form>
      </section>
    `;
  }
};
