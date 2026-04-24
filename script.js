/* script.js */

/* ══ LIGHTBOX ══ */
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbClose    = document.getElementById('lbClose');
const lbBackdrop = document.getElementById('lbBackdrop');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 250);
}

// Attach to photo cards
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    openLightbox(
      card.dataset.src,
      card.dataset.alt
    );
  });
});

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ══ TYPEWRITER for profile name ══ */
const nameEl = document.getElementById('heroName');
if (nameEl) {
  const full = nameEl.textContent.trim();
  nameEl.textContent = '';
  nameEl.style.borderRight = '2px solid var(--accent)';
  let i = 0;
  const type = () => {
    nameEl.textContent = full.slice(0, i++);
    if (i <= full.length) setTimeout(type, 65);
    else setTimeout(() => { nameEl.style.borderRight = 'none'; }, 900);
  };
  setTimeout(type, 300);
}

/* ══ AVATAR tilt on hover (desktop only) ══ */
const avWrap = document.getElementById('heroAvatar');
if (avWrap && window.matchMedia('(pointer: fine)').matches) {
  avWrap.addEventListener('mousemove', e => {
    const r  = avWrap.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2)  / (r.width / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    avWrap.style.transition = 'transform .08s ease';
    avWrap.style.transform  = `rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg)`;
  });
  avWrap.addEventListener('mouseleave', () => {
    avWrap.style.transition = 'transform .4s ease';
    avWrap.style.transform  = 'rotateY(0) rotateX(0)';
  });
}

/* ══ Subtle card reveal on load ══ */
document.querySelectorAll('.photo-card, .banner, .panel-left').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = `opacity .4s ease ${i * 80}ms, transform .4s ease ${i * 80}ms`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }));
});
