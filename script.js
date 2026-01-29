const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const navList = document.querySelector('.nav-list');
const links = document.querySelectorAll('.nav-list a');

navToggle?.addEventListener('click', () => {
    const isOpen = navPanel?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navPanel?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    });
});

const floatingContact = document.querySelector('.floating-contact');
floatingContact?.addEventListener('click', (evt) => {
    evt.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navPanel?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    } else {
        const href = floatingContact.getAttribute('href');
        if (href) window.location.href = href;
    }
});

const form = document.querySelector('.contact-form');
const phoneInput = form?.querySelector('input[name="phone"]');

function formatPhone(raw) {
    const digits = raw.replace(/\D/g, '').replace(/^55*/, '55');
    const limited = digits.slice(0, 13);
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


form?.addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(form);
    const required = ['name', 'email', 'reason', 'message'];
    const missing = required.filter(field => !formData.get(field));
    if (missing.length) {
        alert('Preencha os campos obrigatórios antes de enviar.');
        return;
    }
    alert('Sua mensagem seria enviada para comim@comim.com.');
    form.reset();
    if (phoneInput) phoneInput.value = '+55 ';
});