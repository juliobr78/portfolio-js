const ProjectsManager = {
  init() {},
  renderList() {
    const el = document.getElementById('projectsList');
    if (!el) return;
    const data = App.loadFromStorage() || {};
    const projects = data.projects || [];
    if (projects.length === 0) {
      el.innerHTML = '<p>Nenhum projeto cadastrado.</p>';
      return;
    }
    el.innerHTML = projects.map(p => `
      <div class="project">
        <h3>${p.title}</h3>
        <p>${p.description || ''}</p>
      </div>
    `).join('');
  }
};
