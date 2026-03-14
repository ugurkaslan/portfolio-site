<<<<<<< HEAD
// ==============================
// NAVBAR: scroll shadow + active link
// ==============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 10);

  // highlight active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ==============================
// SCROLL REVEAL
// ==============================
const revealEls = document.querySelectorAll(
  '.about-bio, .about-skills, .skill-group, .tl-item, .project-card, .contact-intro, .contact-form, .meta-item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// ==============================
// CONTACT FORM (mailto fallback)
// ==============================
const form = document.getElementById('contactForm');
const notice = document.getElementById('formNotice');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    notice.textContent = 'Please fill in your name, email and message.';
    notice.className = 'form-notice error';
    return;
  }

  const mailtoSubject = encodeURIComponent(subject || `Message from ${name}`);
  const mailtoBody    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailtoLink    = `mailto:ugurkaplan0101@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  window.location.href = mailtoLink;

  notice.textContent = 'Opening your mail client…';
  notice.className = 'form-notice success';

  setTimeout(() => {
    form.reset();
    notice.textContent = '';
    notice.className = 'form-notice';
  }, 4000);
});

console.log('ugurkaslan.com loaded ✓');
=======
console.log("site loaded")
>>>>>>> 516c572064ee459af4d23f8d26905523b5645c3a
