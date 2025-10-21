const Templates = {
  renderHome() {
    document.querySelector('main').innerHTML = `
      <section class="home">
        <h1>Bem-vindo ao meu portfólio</h1>
        <p>Veja meus projetos e saiba mais sobre mim.</p>
      </section>
    `;
  },
  renderProjetos() {
    document.querySelector('main').innerHTML = `
      <section class="projetos">
        <h2>Projetos</h2>
        <div id="projectsList">
          <p>Nenhum projeto ainda. Use ProjectsManager para adicionar.</p>
        </div>
      </section>
    `;
    ProjectsManager.renderList();
  },
  renderSobre() {
    document.querySelector('main').innerHTML = `
      <section class="sobre">
        <h2>Sobre mim</h2>
        <p>Sou estudante de desenvolvimento web.</p>
      </section>
    `;
  },
  renderContato() {
    document.querySelector('main').innerHTML = `
      <section class="contato">
        <h2>Contato</h2>
        <form id="contactForm">
          <label>Nome</label>
          <input type="text" id="nome" placeholder="Seu nome" required>
          <label>Email</label>
          <input type="email" id="email" placeholder="Seu e-mail" required>
          <label>Mensagem</label>
          <textarea id="mensagem" placeholder="Sua mensagem"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>
    `;
  }
};
