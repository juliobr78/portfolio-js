const FormValidator = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      if (nome === '' || !Utils.isValidEmail(email)) {
        Alert.show('Preencha o nome e um e-mail válido!');
        return;
      }
      // Simula envio e armazena em localStorage
      const mensagem = document.getElementById('mensagem').value.trim();
      const data = { id: Utils.generateId(), nome, email, mensagem, date: new Date() };
      const saved = App.loadFromStorage() || { messages: [] };
      saved.messages = saved.messages || [];
      saved.messages.push(data);
      App.saveToStorage('userData', saved);
      Alert.show('Mensagem enviada com sucesso!');
      form.reset();
    });
  }
};
