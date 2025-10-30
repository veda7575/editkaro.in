/* Editkaro interactive behaviors:
   - mobile nav toggle
   - hover-play preview videos
   - filter portfolio
   - smooth reveal on scroll
   - open video in new tab (fallback)
   - basic contact handler (demo)
*/

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle && navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
  });

  // Hover play for preview videos
  const previewVideos = Array.from(document.querySelectorAll('.preview-video'));
  previewVideos.forEach(v => {
    // ensure muted for autoplay
    v.muted = true;
    v.loop = true;
    v.addEventListener('mouseenter', () => {
      v.play().catch(()=>{/* autoplay block fallback */});
    });
    v.addEventListener('mouseleave', () => {
      try { v.pause(); v.currentTime = 0; } catch(e) {}
    });
  });

  // OPEN preview in new tab / separate view
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.preview-open');
    if (!btn) return;
    const src = btn.dataset.src;
    if (!src) return;
    // open in new tab (simple fallback / preview)
    window.open(src, '_blank');
  });

  // Portfolio filters
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const items = Array.from(document.querySelectorAll('.portfolio-item'));
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        const cat = it.dataset.category || '';
        if (f === 'all' || f === cat) {
          it.style.display = '';
          requestAnimationFrame(()=> { it.style.opacity = 1; it.style.transform = 'none'; });
        } else {
          it.style.opacity = 0;
          it.style.transform = 'translateY(22px)';
          setTimeout(()=> it.style.display = 'none', 320);
        }
      });
    });
  });

  // Scroll reveal
  const revealElems = Array.from(document.querySelectorAll('.reveal, .card'));
  const revealOnScroll = () => {
    const h = window.innerHeight;
    revealElems.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < h - 80) el.classList.add('active');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      ev.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({top, behavior:'smooth'});
      // close mobile nav
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navMenu.style.display = '';
      }
    });
  });

  // Contact form demo
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // demo feedback - replace with real submission API as needed
      alert('Thanks! Your request was received. We will contact you soon.');
      contactForm.reset();
    });
  }
});
