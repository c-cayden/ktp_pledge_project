// Site chrome: floating top bar + full-screen menu (injected on every page).
// Bar: logo left, "Rush KTP" + menu button right. Menu: three columns
// (navigation with sub-links, KTP in Action photos, recruitment), like palantir.com.

// Bootstrap CSS is still used for a few grid/utility classes on inner pages.
function ensureBootstrap() {
  if (!document.querySelector('#bootstrap-css-link')) {
    const css = document.createElement('link');
    css.id = 'bootstrap-css-link';
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    css.integrity = 'sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN';
    css.crossOrigin = 'anonymous';
    document.head.appendChild(css);
  }
}

// Navigation tree. Sub-links point at section ids on each page.
const NAV = [
  { href: '/about', label: 'About' },
  { href: '/recruitment', label: 'Recruitment', sub: [
    ['/recruitment#rush-schedule', 'Rush schedule'],
    ['/recruitment#network', 'Our network'],
    ['/recruitment#faq', 'FAQ'],
  ]},
  { href: '/professional-development', label: 'Professional Development', sub: [
    ['/professional-development#hackathons', 'Hackathons'],
    ['/professional-development#workshops', 'Workshops'],
    ['/professional-development#resources', 'Resources'],
  ]},
  { href: '/brothers', label: 'Brothers', sub: [
    ['/brothers#actives', 'Actives'],
    ['/brothers#eboard', 'Executive Board'],
    ['/brothers#alumni', 'Alumni'],
  ]},
  { href: '/ktp-in-action', label: 'KTP in Action' },
  { href: '/nationals', label: 'Nationals' },
  { href: '/contact', label: 'Contact' },
];

function currentPath() {
  let p = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (p.length > 1) p = p.replace(/\/$/, '');
  return p;
}

function createChrome() {
  const here = currentPath();
  const navHtml = NAV.map((item) => {
    const cur = item.href === here ? ' is-current' : '';
    const subs = (item.sub || []).map(([href, label]) =>
      `<li><a class="menu-sub" href="${href}"><span class="menu-arrow" aria-hidden="true">&#8627;</span>${label}</a></li>`).join('');
    return `<li><a class="menu-top${cur}" href="${item.href}"${cur ? ' aria-current="page"' : ''}>${item.label}</a>${subs ? `<ul class="menu-subs">${subs}</ul>` : ''}</li>`;
  }).join('');

  return `
    <div class="site-bar" id="siteBar">
      <a href="/" class="site-logo" aria-label="Kappa Theta Pi, Rho Chapter home">
        <span class="site-letters">ΚΘΠ</span>
        <span class="site-chapter">Rho Chapter</span>
      </a>
      <div class="site-bar-right">
        <a href="/recruitment" class="site-cta">Rush KTP</a>
        <button type="button" class="site-menu-btn" id="siteMenuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu">
          <span class="site-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>

    <div class="site-menu" id="siteMenu" aria-hidden="true">
      <div class="site-menu-inner">
        <div class="menu-col menu-col--nav">
          <div class="menu-head"><span>Navigation</span></div>
          <ul class="menu-nav">${navHtml}</ul>
        </div>

        <div class="menu-col menu-col--photos">
          <div class="menu-head"><span>KTP in Action</span><a href="/ktp-in-action">View gallery <span aria-hidden="true">&#8599;</span></a></div>
          <div class="menu-photos">
            <a class="menu-photo" href="/ktp-in-action">
              <span class="menu-photo-label">Spring Formal &middot; April 2026</span>
              <img src="images/menu/formal.jpg" alt="Brothers at spring formal" loading="lazy">
              <span class="menu-photo-title">The chapter, off the clock.</span>
              <span class="menu-link"><span class="menu-arrow" aria-hidden="true">&#8627;</span>See the photos</span>
            </a>
            <a class="menu-photo" href="/professional-development#hackathons">
              <span class="menu-photo-label">Hackathons &middot; Spring 2026</span>
              <img src="images/menu/brothers.jpg" alt="KTP brothers together on campus" loading="lazy">
              <span class="menu-photo-title">Built under pressure.</span>
              <span class="menu-link"><span class="menu-arrow" aria-hidden="true">&#8627;</span>Hackathon results</span>
            </a>
          </div>
        </div>

        <div class="menu-col menu-col--rush">
          <div class="menu-head"><span>Recruitment</span><a href="/recruitment#rush-schedule">Rush schedule <span aria-hidden="true">&#8599;</span></a></div>
          <p class="menu-blurb">We recruit at the start of every fall and spring semester. Any major, any year with three semesters left. Come to an info session, meet the brothers, and apply.</p>
          <a class="menu-link menu-link--lg" href="/recruitment"><span class="menu-arrow" aria-hidden="true">&#8627;</span>Learn more about rush</a>
          <a class="menu-link menu-link--lg" href="/recruitment#faq"><span class="menu-arrow" aria-hidden="true">&#8627;</span>Read the FAQ</a>
          <div class="menu-foot">
            <a href="/about">About KTP</a>
            <div class="menu-social">
              <a href="https://www.instagram.com/ktpvandy" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">&#8599;</span></a>
              <a href="https://www.linkedin.com/company/kappa-theta-pi-vanderbilt" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">&#8599;</span></a>
              <a href="mailto:ktp@vanderbilt.edu">ktp@vanderbilt.edu</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function enableMenu() {
  const btn = document.getElementById('siteMenuBtn');
  const menu = document.getElementById('siteMenu');
  const bar = document.getElementById('siteBar');
  if (!btn || !menu || !bar) return;

  let scrollY = 0;
  const open = () => {
    scrollY = window.scrollY;
    document.documentElement.classList.add('menu-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    document.body.style.top = `-${scrollY}px`;
  };
  const close = () => {
    document.documentElement.classList.remove('menu-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  };
  btn.addEventListener('click', () => {
    document.documentElement.classList.contains('menu-open') ? close() : open();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) close();
  });
  // Same-page anchor links should close the menu and jump
  menu.querySelectorAll('a[href]').forEach((a) => {
    a.addEventListener('click', () => {
      const url = new URL(a.getAttribute('href'), location.href);
      if (url.pathname === location.pathname && url.hash) {
        close();
        // let the hash navigation happen after the scroll lock is released
        setTimeout(() => { location.hash = url.hash; }, 0);
      }
    });
  });

  // Bar picks up a solid ground once the page is scrolled a bit
  const onScroll = () => bar.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function injectHeader() {
  if (!document.querySelector('#header-css-link')) {
    const linkTag = document.createElement('link');
    linkTag.id = 'header-css-link';
    linkTag.rel = 'stylesheet';
    linkTag.href = 'css/header-styles/header.css';
    document.head.appendChild(linkTag);
  }
  ensureBootstrap();
  document.body.insertAdjacentHTML('afterbegin', createChrome());
  enableMenu();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}
