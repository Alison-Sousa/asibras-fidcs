const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const links = document.querySelectorAll('.nav-list a');
const backToTop = document.querySelector('#back-to-top');

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
const phoneInput = form?.querySelector('input[name="phone"]');

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').replace(/^55*/, '55');
  const limited = digits.slice(0, 13); // +55 + DDD + número máx. 11 dígitos
  const country = '+55';
  const rest = limited.slice(2);
  const ddd = rest.slice(0, 2);
  const number = rest.slice(2);

  if (!rest) return country + ' ';
  if (number.length <= 4) {
    return `${country} (${ddd}${number.length ? ') ' + number : ''}`;
  }
  if (number.length <= 8) {
    const part1 = number.slice(0, 4);
    const part2 = number.slice(4);
    return `${country} (${ddd}) ${part1}${part2 ? '-' + part2 : ''}`;
  }
  const part1 = number.slice(0, 5);
  const part2 = number.slice(5, 9);
  return `${country} (${ddd}) ${part1}${part2 ? '-' + part2 : ''}`;
}

phoneInput?.addEventListener('focus', () => {
  if (!phoneInput.value.trim()) phoneInput.value = '+55 ';
});

phoneInput?.addEventListener('input', () => {
  phoneInput.value = formatPhone(phoneInput.value);
});

// Toggle doc buttons on "Documentos"
document.querySelectorAll('.fund-actions .doc-label').forEach(label => {
  const actions = label.closest('.fund-actions');
  if (!actions) return;
  label.addEventListener('click', evt => {
    evt.stopPropagation();
    actions.classList.toggle('open');
  });
});

document.addEventListener('click', evt => {
  document.querySelectorAll('.fund-actions.open').forEach(actions => {
    if (!actions.contains(evt.target)) actions.classList.remove('open');
  });
});

// Back to top visibility
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  const show = window.scrollY > 380;
  backToTop.classList.toggle('show', show);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

form?.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(form);
  const required = ['name', 'email', 'reason', 'message'];
  const missing = required.filter(field => !formData.get(field));
  if (missing.length) {
    alert('Preencha os campos obrigatórios antes de enviar.');
    return;
  }
  alert('Sua mensagem seria enviada para comim@comim.com (integração de envio no backend seguro).');
  form.reset();
  if (phoneInput) phoneInput.value = '+55 ';
});
