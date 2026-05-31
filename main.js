// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── PARALLAX HERO ──
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.25}px)`;
  }
}, { passive: true });

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.stats-inner, .testi-grid, .features-grid, .footer-grid').forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 90}ms`;
  });
});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ──
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const step = target / (2000 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => counterObs.observe(el));

// ── MENU TABS ──
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.mcard').forEach(card => {
      const show = card.dataset.tab === tab;
      card.classList.toggle('hidden', !show);
      if (show) card.style.animation = 'fadeUp .4s ease both';
    });
  });
});

// ── HAMBURGER ──
document.getElementById('hamburger').addEventListener('click', () =>
  document.body.classList.toggle('nav-open'));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('nav-open');
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#27ae60';
  btn.style.borderColor = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = btn.style.borderColor = '';
    e.target.reset();
  }, 3000);
});

// ── NEWSLETTER ──
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓';
  btn.style.background = '#27ae60';
  setTimeout(() => { btn.textContent = '→'; btn.style.background = ''; e.target.reset(); }, 2500);
});

// ═══════════════════════════════════════════
//  CART
// ═══════════════════════════════════════════

const cart = {};

function addToCart(name, price) {
  cart[name] ? cart[name].qty++ : (cart[name] = { price, qty: 1 });
  renderCart();
  updateBadge();
  openCart();
}

function changeQty(name, delta) {
  if (!cart[name]) return;
  cart[name].qty += delta;
  if (cart[name].qty <= 0) delete cart[name];
  renderCart();
  updateBadge();
}

function cartTotal() {
  return Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
}
function cartCount() {
  return Object.values(cart).reduce((s, i) => s + i.qty, 0);
}

function updateBadge() {
  const n = cartCount();
  const badge = document.getElementById('cartBadge');
  badge.textContent = n;
  badge.classList.toggle('show', n > 0);
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const keys = Object.keys(cart);

  if (!keys.length) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br>Add items from the menu!</p>';
    footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = keys.map(name => {
    const safe = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `<div class="cart-item">
      <div class="cart-item-name">${name}</div>
      <div class="cart-qty">
        <button class="qty-btn" onclick="changeQty('${safe}', -1)">−</button>
        <span class="qty-num">${cart[name].qty}</span>
        <button class="qty-btn" onclick="changeQty('${safe}', 1)">+</button>
      </div>
      <div class="cart-item-price">$${(cart[name].price * cart[name].qty).toFixed(2)}</div>
    </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = '$' + cartTotal().toFixed(2);
  footerEl.style.display = 'block';
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', openCheckout);

// Add to cart from menu cards
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.mcard');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
    addToCart(name, price);
    btn.textContent = '✓';
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 1000);
  });
});

// ═══════════════════════════════════════════
//  CHECKOUT
// ═══════════════════════════════════════════

let checkoutStep = 1;
let isPickup = false;

function openCheckout() {
  if (!cartCount()) return;
  closeCart();
  checkoutStep = 1;
  showCheckoutStep(1);
  document.getElementById('checkoutOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showCheckoutStep(step) {
  document.querySelectorAll('.co-step').forEach(el => el.classList.add('hidden'));
  const id = step === 'Confirm' ? 'stepConfirm' : `step${step}`;
  document.getElementById(id).classList.remove('hidden');

  document.querySelectorAll('.co-prog-step').forEach(el => {
    const n = +el.dataset.step;
    el.classList.remove('active', 'done');
    if (typeof step === 'number') {
      if (n === step) el.classList.add('active');
      if (n < step) el.classList.add('done');
    }
  });
}

function nextCheckoutStep(step) {
  if (step > checkoutStep) {
    if (checkoutStep === 1) {
      const name = val('co-name'), email = val('co-email'), phone = val('co-phone');
      if (!name || !email || !phone) { markEmpty('step1'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        flash(document.getElementById('co-email')); return;
      }
    }
    if (checkoutStep === 2 && !isPickup) {
      if (!val('co-street') || !val('co-city') || !val('co-zip')) { markEmpty('step2'); return; }
    }
  }
  if (step === 3) buildOrderSummary();
  checkoutStep = step;
  showCheckoutStep(step);
}

function val(id) { return document.getElementById(id).value.trim(); }

function flash(input) {
  input.style.borderColor = '#e74c3c';
  input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
}

function markEmpty(stepId) {
  document.querySelectorAll(`#${stepId} input`).forEach(input => {
    if (!input.value.trim()) flash(input);
  });
}

function setPickup(pickup) {
  isPickup = pickup;
  document.getElementById('deliveryBtn').classList.toggle('active', !pickup);
  document.getElementById('pickupBtn').classList.toggle('active', pickup);
  document.getElementById('addressFields').classList.toggle('hidden', pickup);
  document.getElementById('pickupInfo').classList.toggle('hidden', !pickup);
}

function buildOrderSummary() {
  const el = document.getElementById('orderSummary');
  el.innerHTML =
    Object.keys(cart).map(name =>
      `<div class="os-row"><span>${name} &times; ${cart[name].qty}</span><span>$${(cart[name].price * cart[name].qty).toFixed(2)}</span></div>`
    ).join('') +
    `<div class="os-total"><span>Total</span><span>$${cartTotal().toFixed(2)}</span></div>`;
}

function placeOrder() {
  const cardname = val('co-cardname');
  const cardnum  = document.getElementById('co-cardnum').value.replace(/\s/g, '');
  const expiry   = val('co-expiry');
  const cvv      = val('co-cvv');

  if (!cardname || cardnum.length < 15 || expiry.length < 4 || cvv.length < 3) {
    markEmpty('step3'); return;
  }

  const orderNum = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  document.getElementById('orderNum').textContent = '#' + orderNum;
  document.getElementById('confirmEmail').textContent = val('co-email');
  document.getElementById('confirmEta').textContent = isPickup
    ? '⏱ Ready for pickup in 15–20 minutes'
    : '🚗 Estimated delivery: 30–45 minutes';

  Object.keys(cart).forEach(k => delete cart[k]);
  updateBadge();
  renderCart();
  showCheckoutStep('Confirm');
}

// Close checkout on overlay click
document.getElementById('checkoutOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeCheckout();
});
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);

// ── Card number formatting ──
document.getElementById('co-cardnum').addEventListener('input', function () {
  const digits = this.value.replace(/\D/g, '').substr(0, 16);
  let out = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) out += ' ';
    out += digits[i];
  }
  this.value = out;
});

// ── Expiry formatting ──
document.getElementById('co-expiry').addEventListener('input', function () {
  const digits = this.value.replace(/\D/g, '').substr(0, 4);
  this.value = digits.length > 2 ? digits.substr(0, 2) + ' / ' + digits.substr(2) : digits;
});

// ── CVV ──
document.getElementById('co-cvv').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').substr(0, 4);
});
