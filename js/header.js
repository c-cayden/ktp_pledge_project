// Ensure Bootstrap CSS/JS exist (for offcanvas)
// Prevent overlay flash before JS activates
(function guard() {
  if (document.getElementById('header-critical-guard')) return;
  const s = document.createElement('style');
  s.id = 'header-critical-guard';
  s.textContent = `
    .mobile-menu-overlay {
      opacity: 0; 
      visibility: hidden; 
      pointer-events: none;
    }
    .mobile-menu-overlay.active {
      opacity: 1; 
      visibility: visible; 
      pointer-events: auto;
    }
  `;
  document.head.appendChild(s);
})();

// Load Bootstrap CSS quickly (JS optional)
function ensureBootstrap() {
  if (!document.querySelector('#bootstrap-css-link')) {
    const css = document.createElement('link');
    css.id = 'bootstrap-css-link';
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(css);
  }
  // JS bundle usually not needed for your header; comment if unused
  // if (!document.querySelector('#bootstrap-js-bundle')) {
  //   const js = document.createElement('script');
  //   js.id = 'bootstrap-js-bundle';
  //   js.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
  //   js.defer = true;
  //   document.head.appendChild(js);
  // }
}


// Header component for KTP website
function createHeader() {
  return `
    <header>
      <!-- Desktop / Tablet header (unchanged for ≥768px) -->
      <div class="header-left d-none d-md-flex" data-animation-role="header-element">
        <a href="/" data-animation-role="header-element" class="logo-text">
          <div class="greek-letters">ΚΘΠ</div>
          <div class="chapter-text">RHO CHAPTER</div>
        </a>
      </div>

      <nav class="nav-links d-none d-md-flex">
        <a href="/about">About</a>
        <a href="/recruitment">Recruitment</a>
        <a href="/professional-development">Professional Development</a>
        <a href="/brothers">Brothers</a>
        <a href="/ktp-in-action">KTP in Action</a>
        <a href="/nationals">Nationals</a>
        <a href="/contact">Contact</a>
      </nav>

      <!-- Mobile header (phones only) -->
      <div class="mobile-header d-md-none">
        <!-- Logo: top-left (unchanged) -->
        <a href="/" class="logo-text">
          <div class="greek-letters">ΚΘΠ</div>
          <div class="chapter-text">RHO CHAPTER</div>
        </a>

        <!-- Hamburger: top-right — triggers full-screen overlay -->
        <button
          class="mobile-menu-toggle"
          type="button"
          id="mobileMenuToggle"
          aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Full-screen mobile menu overlay -->
        <div class="mobile-menu-overlay" id="mobileMenuOverlay">
          <div class="mobile-menu-content">
            <!-- Logo in top-left -->
            <div class="mobile-menu-logo">
              <div class="greek-letters">ΚΘΠ</div>
              <div class="chapter-text">RHO CHAPTER</div>
            </div>
            
            <!-- Close button in top-right -->
            <button class="mobile-menu-close" id="mobileMenuClose">
              <span>×</span>
            </button>
            
            <!-- Navigation links centered -->
            <nav class="mobile-menu-nav">
              <a href="/about">About</a>
              <a href="/recruitment">Recruitment</a>
              <a href="/professional-development">Professional Development</a>
              <a href="/brothers">Brothers</a>
              <a href="/ktp-in-action">KTP in Action</a>
              <a href="/nationals">Nationals</a>
              <a href="/contact">Contact</a>
            </nav>
            
            <!-- Social media icon at bottom -->
            <div class="mobile-menu-social">
              <a href="https://www.linkedin.com/company/kappa-theta-pi-vanderbilt" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Compact sticky bar: appears once the big header scrolls away
const NAV_ITEMS = [
  ['/about', 'About'],
  ['/recruitment', 'Recruitment'],
  ['/professional-development', 'Professional Development'],
  ['/brothers', 'Brothers'],
  ['/ktp-in-action', 'KTP in Action'],
  ['/nationals', 'Nationals'],
  ['/contact', 'Contact'],
];

function currentPath() {
  let p = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (p.length > 1) p = p.replace(/\/$/, '');
  return p;
}

function createTopbar() {
  const here = currentPath();
  const links = NAV_ITEMS.map(([href, label]) =>
    `<a href="${href}"${href === here ? ' class="is-current" aria-current="page"' : ''}>${label}</a>`
  ).join('');
  return `
    <div class="topbar" id="siteTopbar" aria-label="Site navigation">
      <a href="/" class="topbar-logo" aria-label="Kappa Theta Pi home">
        <span class="topbar-letters">ΚΘΠ</span>
        <span class="topbar-chapter">Rho Chapter</span>
      </a>
      <nav class="topbar-nav">${links}</nav>
      <div class="topbar-right">
        <a href="/recruitment" class="topbar-cta">Rush KTP</a>
        <button type="button" class="topbar-menu" id="topbarMenuToggle" aria-label="Open menu">
          <span></span><span></span>
        </button>
      </div>
    </div>
  `;
}

function enableTopbar() {
  const bar = document.getElementById('siteTopbar');
  const header = document.querySelector('header');
  if (!bar || !header) return;

  let threshold = 0;
  const measure = () => { threshold = Math.max(120, header.offsetHeight - 40); };
  const update = () => {
    bar.classList.toggle('topbar--visible', window.scrollY > threshold);
  };
  measure();
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', () => { measure(); update(); });

  // Phones: the bar's hamburger opens the existing full-screen menu
  const toggle = document.getElementById('topbarMenuToggle');
  const overlay = document.getElementById('mobileMenuOverlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
}

// Mobile menu functionality
function enableMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const toggle = document.getElementById('mobileMenuToggle');
  const close = document.getElementById('mobileMenuClose');
  
  if (!overlay || !toggle || !close) return;
  
  // Open menu
  toggle.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
  
  // Close menu
  close.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  });
  
  // Close when clicking overlay background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close when clicking navigation links
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Function to inject header into page
function injectHeader() {
  // Add header CSS link if not already present
  if (!document.querySelector('#header-css-link')) {
    const linkTag = document.createElement('link');
    linkTag.id = 'header-css-link';
    linkTag.rel = 'stylesheet';
    linkTag.href = 'css/header-styles/header.css';
    document.head.appendChild(linkTag);
  }

  // Add Bootstrap for offcanvas
  ensureBootstrap();

  // Add header HTML at the beginning of body
  const headerHtml = createHeader();
  document.body.insertAdjacentHTML('afterbegin', headerHtml);
  document.body.insertAdjacentHTML('afterbegin', createTopbar());

  // Enable mobile menu functionality
  enableMobileMenu();
  enableTopbar();
}

// Auto-inject header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}
const y = window.scrollY;
document.body.classList.add('menu-locked');
document.body.style.top = `-${y}px`;
// ...
const restore = parseInt(document.body.style.top || '0') * -1;
document.body.classList.remove('menu-locked');
document.body.style.top = '';
window.scrollTo(0, restore);

