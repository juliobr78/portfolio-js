const FormValidator = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    // evitar múltiplos listeners
    form.removeEventListener && form.removeEventListener('submit', this._handler);
    this._handler = (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      if (nome === '' || email === '') {
        Alert.show('Por favor preencha nome e e-mail.');
        return;
      }
      if (!Utils.isValidEmail(email)) {
        Alert.show('E-mail inválido. Corrija por favor.');
        return;
      }
      // salvar no storage
      const saved = App.loadFromStorage() || { messages: [], projects: [] };
      saved.messages = saved.messages || [];
      saved.messages.push({ id: Utils.generateId(), nome, email, mensagem, date: new Date().toISOString() });
      App.saveToStorage('userData', saved);
      Alert.show('Mensagem enviada com sucesso!');
      form.reset();
    };
    form.addEventListener('submit', this._handler);
  }
};
