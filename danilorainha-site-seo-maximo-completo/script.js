(() => {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');

  if (menu && header) {
    menu.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    document.querySelectorAll('.nav a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('menu-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  if (!document.documentElement.classList.contains('no-motion') &&
      'IntersectionObserver' in window) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('animate-ready'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal.animate-ready').forEach(el => observer.observe(el));
  }

  const bubble = document.getElementById('waBubble');
  const closeBubble = document.getElementById('closeBubble');
  if (bubble && closeBubble && !sessionStorage.getItem('dr_wa_bubble_closed')) {
    const show = () => bubble.classList.add('show');
    setTimeout(show, 8000);
    setTimeout(() => bubble.classList.remove('show'), 38000);
    closeBubble.addEventListener('click', () => {
      bubble.classList.remove('show');
      sessionStorage.setItem('dr_wa_bubble_closed', '1');
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const horario = document.getElementById('horario').value.trim() || 'Não informado';
      const mensagem = document.getElementById('mensagem').value.trim();
      const text =
        `Olá, Danilo! Vim pelo site e gostaria de saber mais sobre o atendimento online.\n\n` +
        `Nome: ${nome}\nPreferência de horário: ${horario}\n\n` +
        `Gostaria de conversar sobre: ${mensagem}`;
      window.open('https://wa.me/5511926018646?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
    });
  }
})();