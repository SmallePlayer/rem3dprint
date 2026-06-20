document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
    });
    setTimeout(() => preloader.classList.add('hidden'), 2000);
  }

  // Header scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
  }, { passive: true });

  // Mobile nav
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq__item.active').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    const agree = document.getElementById('formAgree');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (agree && !agree.checked) {
        alert('Необходимо согласие на обработку персональных данных');
        return;
      }

      const btn = form.querySelector('.form__submit');
      const originalText = btn.textContent;
      btn.textContent = 'Отправка...';
      btn.disabled = true;

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone) {
        btn.textContent = 'Заполните имя и телефон';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
        return;
      }

      const phoneClean = phone.replace(/[^+\d]/g, '');
      if (phoneClean.length < 10) {
        btn.textContent = 'Неверный номер телефона';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
        return;
      }

      const text = [
        `\u{1F514} \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430 \u0418\u043D\u0433\u0435\u043D\u0438\u043E\u043D \u0418\u043D\u0436\u0438\u043D\u0438\u0440\u0438\u043D\u0433`,
        `\u0418\u043C\u044F: ${name}`,
        `\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ${phoneClean}`,
        service ? `\u0423\u0441\u043B\u0443\u0433\u0430: ${service}` : '',
        message ? `\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ${message}` : '',
      ].filter(Boolean).join('\n');

      try {
        const tgBotToken = '';
        const tgChatId = '';
        if (tgBotToken && tgChatId) {
          await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: tgChatId, text, parse_mode: 'HTML' }),
          });
        }

        btn.textContent = '\u2713 \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E!';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);

        if (window.ym) {
          window.ym(window.ymId, 'reachGoal', 'form_submit');
        }

      } catch {
        btn.textContent = '\u2717 \u041E\u0448\u0438\u0431\u043A\u0430';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }
});