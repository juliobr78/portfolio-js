const ProjectsManager = {
  addSampleProject() {
    const storage = App.loadFromStorage() || { projects: [], messages: [] };
    storage.projects = storage.projects || [];
    const sample = {
      id: Utils.generateId(),
      title: 'Projeto Exemplo',
      description: 'Projeto demonstrativo — SPA + validação + armazenamento local',
      date: new Date().toISOString()
    };
    storage.projects.push(sample);
    App.saveToStorage('userData', storage);
  },
  renderList() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    const storage = App.loadFromStorage() || { projects: [] };
    const projects = storage.projects || [];
    if (projects.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;color:var(--muted)">Nenhum projeto cadastrado. Clique em "Adicionar projeto exemplo".</div>`;
      return;
    }
    grid.innerHTML = projects.map(p => `
      <div class="project-card">
        <div class="project-thumb">${p.title[0] || 'P'}</div>
        <h3 style="margin:10px 0 6px">${p.title}</h3>
        <p style="color:var(--muted);font-size:14px">${p.description}</p>
      </div>
    `).join('');
  },
  init() {}
};
