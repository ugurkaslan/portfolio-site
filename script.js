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
// CONTACT FORM (Web3Forms)
// ==============================
const form = document.getElementById('contactForm');
const notice = document.getElementById('formNotice');
const submitBtn = form.querySelector('.form-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // basic validation
  if (!name || !email || !message) {
    notice.textContent = 'Please fill in your name, email and message.';
    notice.className = 'form-notice error';
    return;
  }

  // loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  notice.textContent = '';
  notice.className = 'form-notice';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '753ffb66-1bcf-4c1c-8e8a-c798a8ff41b3',
        name,
        email,
        subject: subject || `Portfolio message from ${name}`,
        message,
        botcheck: ''  // honeypot spam protection
      })
    });

    const data = await response.json();

    if (data.success) {
      notice.textContent = '✓ Message sent! I\'ll get back to you soon.';
      notice.className = 'form-notice success';
      form.reset();
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    notice.textContent = 'Something went wrong. Please try emailing me directly.';
    notice.className = 'form-notice error';
    console.error('Web3Forms error:', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

console.log('ugurkaslan.com loaded ✓');
