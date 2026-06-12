// ============================================
//   BUILTBYAMAAN - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- YEAR ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- CURSOR GLOW ----
  const cursor = document.getElementById('cursorGlow');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }, { passive: true });
  }

  // ---- SCROLL PROGRESS ----
  const scrollBar = document.getElementById('scrollProgress');
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = (scrollTop / docHeight * 100) + '%';

    // Header shadow
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', scrollTop > 50);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      const link = document.querySelector(`.option a[href="#${section.id}"]`);
      if (link) link.classList.toggle('active', scrollTop >= top && scrollTop < bottom);
    });

    // Skill bar animation
    animateSkillBars();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- MENU TOGGLE ----
  const menuLabel = document.querySelector('.menu-icons');
  const sidebar = document.querySelector('.sidebar');
  if (menuLabel && sidebar) {
    menuLabel.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuLabel.classList.toggle('open');
    });
  }

  // ---- SIDEBAR CLOSE ----
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  if (menuLabel && sidebar) {
    sidebarLinks.forEach(link => link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      menuLabel.classList.remove('open');
    }));
  }

  // ---- TYPING ANIMATION ----
  const titles = [
    'Web Developer',
    'Web Designer',
    'Frontend Craftsman',
    'UI/UX Enthusiast'
  ];
  let titleIdx = 0, charIdx = 0, isDeleting = false;
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const type = () => {
      const current = titles[titleIdx];
      typingEl.textContent = isDeleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

      let delay = isDeleting ? 60 : 100;
      if (!isDeleting && charIdx > current.length) { isDeleting = true; delay = 1800; }
      else if (isDeleting && charIdx < 0) {
        isDeleting = false; charIdx = 0;
        titleIdx = (titleIdx + 1) % titles.length; delay = 300;
      }
      setTimeout(type, delay);
    };
    setTimeout(type, 800);
  }

  // ---- SKILL BARS (scroll triggered) ----
  let barsAnimated = false;
  const animateSkillBars = () => {
    if (barsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      barsAnimated = true;
      document.querySelectorAll('.progress-bar').forEach(bar => {
        const target = bar.style.getPropertyValue('--target') || bar.style.width || '0%';
        bar.style.setProperty('--target', target);
        bar.style.width = target;
      });
    }
  };
  animateSkillBars();

  // ---- PARTICLES ----
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 15 + 12;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}%;
        animation-delay:${delay}s;
        animation-duration:${duration}s;
        opacity:${Math.random() * 0.4 + 0.1};
      `;
      particleContainer.appendChild(p);
    }
  }

  // ---- REVEAL ON SCROLL ----
  const revealEls = document.querySelectorAll('.project-card, .skill-card, .about-grid, .contact-wrapper');
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ---- TILT EFFECT on project cards ----
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
