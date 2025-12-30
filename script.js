const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const links = document.querySelectorAll('.nav-list a');

navToggle?.addEventListener('click', () => {
  navList.classList.toggle('open');
});

links.forEach(link => {
  link.addEventListener('click', evt => {
    evt.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    navList.classList.remove('open');
  });
});

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(form);
  const required = ['name', 'email', 'reason', 'message'];
  const missing = required.filter(field => !formData.get(field));
  if (missing.length) {
    alert('Preencha os campos obrigatórios antes de enviar.');
    return;
  }
  alert('Mensagem registrada. Em produção, integraríamos com seu backend seguro.');
  form.reset();
});
