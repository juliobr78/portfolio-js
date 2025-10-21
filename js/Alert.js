const Alert = {
  show(message) {
    // notificação simples: toast temporário
    const existing = document.getElementById('simple-alert');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'simple-alert';
    el.textContent = message;
    el.style.position = 'fixed';
    el.style.right = '18px';
    el.style.bottom = '18px';
    el.style.padding = '12px 16px';
    el.style.borderRadius = '10px';
    el.style.background = 'linear-gradient(90deg,#60a5fa,#6ee7b7)';
    el.style.color = '#022';
    el.style.fontWeight = '700';
    el.style.zIndex = 9999;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 3000);
  }
};
