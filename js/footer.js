// Footer: Desktop = 3 cols (Menu | Follow Us | Beep).
// Phone = 2 cols (Menu left | Follow Us right), Beep sits BELOW under the right column.
function createFooter() {
  return `
    <footer>
      <style>
        :root {
          --ktp-blue: #1f4f8b;
          --text: #ffffff;
          --text-dim: rgba(255,255,255,0.88);
          --line: rgba(255,255,255,0.22);
          --icon: 24px;
          --sw: 1.8;
        }
        footer {
          background: var(--ktp-blue);
          color: var(--text);
          padding: 28px 0 22px;
          font-family: "Roboto", Arial, sans-serif;
          font-size: 16px;
        }
        .footer-wrap { max-width: 1200px; margin: 0 auto; padding: 0 22px; }

        /* ---------- Desktop/Tablet: 3 columns ---------- */
        .footer-top {
          display: grid;
          grid-template-columns: minmax(200px, 1fr) auto minmax(200px, 1fr);
          grid-template-areas: "left middle right";
          gap: 36px;
          padding-bottom: 16px;
          align-items: start;
        }
        .footer-col--left   { grid-area: left;   padding-left: 20px; }
        .footer-col--middle { grid-area: middle; justify-self: center; text-align: center; }
        .footer-col--brand  { grid-area: right;  padding-right: 20px; justify-self: end; text-align: right; }

        .footer-col h4 {
          margin: 0 0 10px;
          font-weight: 700;
          font-size: 18px;
          color: var(--text);
        }

        /* Menu */
        .footer-list { list-style: none; padding: 0; margin: 0; }
        .footer-list li { margin: 6px 0; }
        .footer-list a { color: var(--text-dim); text-decoration: none; }
        .footer-list a:hover { text-decoration: underline; }

        /* Follow Us */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 6px;
        }
        .social-linkRow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          text-decoration: none;
          line-height: 1;
          border-radius: 6px;
          padding: 2px 0;
        }
        .social-icon { width: var(--icon); height: var(--icon); display: block; }
        .social-icon--outline {
          stroke: currentColor; fill: none; stroke-width: var(--sw);
          stroke-linecap: round; stroke-linejoin: round;
        }
        .social-icon--fill { fill: currentColor; }
        .social-title { font-size: 15px; font-weight: 500; color: var(--text); transform: translateY(1px); }

        /* Beep doodle */
        .footer-beep { margin-top: auto; }
        .beep-img {
          height: 100px; width: 100px; transform: rotate(10deg);
          display: block; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
        }

        /* Bottom */
        .footer-bottom {
          border-top: 1px solid var(--line);
          padding-top: 12px;
          text-align: center; /* always centered */
        }
        .footer-bottom p { margin: 3px 0; font-size: 15px; color: var(--text-dim); }

        /* ---------- PHONE: two divisions on first row; doodle below right ---------- */
        @media (max-width: 767.98px) {
          .footer-top {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "left right"   /* row 1: Menu | Follow Us */
              ".    beep";   /* row 2: doodle under right column */
            gap: 16px;
            padding-bottom: 10px;
            align-items: start;
          }

          .footer-col--left {
            grid-area: left;
            padding-left: 0;
            justify-self: start;
            text-align: left;
          }

          .footer-col--middle {
            grid-area: right;
            justify-self: end;
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end; /* title directly above IG/Git rows */
          }

          .footer-col--brand {
            grid-area: beep;
            display: block;
            justify-self: end;
            padding-right: 0;
            text-align: right;
          }
          .footer-col--brand h4 { display: none; }
          .beep-img { height: 72px; width: 72px; transform: rotate(8deg); }

          .footer-bottom p { font-size: 14px; }
        }

        /* ---------- Very small phones ---------- */
        @media (max-width: 360px) {
          .social-title { display: none; } /* icons only if space is tight */
        }
      </style>

      <div class="footer-wrap">
        <div class="footer-top">
          <!-- Left: Menu -->
          <div class="footer-col footer-col--left">
            <h4>Navigation</h4>
            <ul class="footer-list">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="recruitment.html">Recruitment</a></li>
              <li><a href="professional-development.html">Professional Development</a></li>
              <li><a href="brothers.html">Brothers</a></li>
              <li><a href="ktp-in-action.html">KTP in Action</a></li>
              <li><a href="nationals.html">Nationals</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <!-- Middle / Right on phone: Follow Us -->
          <div class="footer-col footer-col--middle">
            <h4>Follow Us</h4>
            <div class="social-grid" aria-label="Social links">
              <!-- Instagram -->
              <a class="social-linkRow" href="https://instagram.com/ktpvandy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" class="social-icon social-icon--outline" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.2"/>
                  <circle cx="17" cy="7" r="1.3" fill="currentColor"/>
                </svg>
                <span class="social-title">Instagram</span>
              </a>

              <!-- GitHub (brand-accurate) -->
              <!-- TikTok -->
<a class="social-linkRow" 
   href="https://www.tiktok.com/@ktpvandy" 
   target="_blank" 
   rel="noopener noreferrer" 
   aria-label="TikTok">
  <svg viewBox="0 0 48 48" class="social-icon social-icon--fill" aria-hidden="true">
    <path d="M30 4h6.2c.3 2.7 1.4 4.9 3.4 6.7 1.5 1.4 3.2 2.3 5.3 2.7v6.3c-2.1.1-4.1-.3-6-1.2v13.6
             c0 8.2-6.6 14.9-14.9 15-3.5 0-6.7-1.2-9.2-3.3-2.7-2.3-4.3-5.7-4.3-9.4 0-6.7 5.4-12.1 12.1-12.1
             1 0 2 .1 2.9.4v6.8c-.8-.2-1.5-.4-2.4-.3-3 .2-5.3 2.7-5.3 5.7 0 1.6.7 3.1 1.9 4.2 1.2 1 2.7 1.5
             4.3 1.4 3-.2 5.4-2.7 5.4-5.7V4z"/>
  </svg>
  <span class="social-title">TikTok</span>
</a>

              <div class="social-grid" aria-label="Social links">
  <!-- Instagram ... -->
  <!-- GitHub ... -->
  <!-- LinkedIn -->
  <!-- LinkedIn -->
<!-- LinkedIn -->
<a class="social-linkRow" 
   href="https://www.linkedin.com/company/kappa-theta-pi-rho/posts/?feedView=all" 
   target="_blank" 
   rel="noopener noreferrer" 
   aria-label="LinkedIn">
  <svg viewBox="0 0 24 24" class="social-icon social-icon--fill" aria-hidden="true" style="transform: scale(0.92);">
    <path d="M4.98 3.5C4.98 5 3.9 6.1 2.4 6.1 1 6.1 0 5 0 3.5 0 2 1 1 2.4 1c1.5 0 2.58 1 2.58 2.5zM.2 8.3h4.4V24H.2V8.3zM8.5 8.3h4.2v2.1h.06c.59-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.6V24h-4.4v-7.9c0-1.9 0-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.2V24H8.5V8.3z"/>
  </svg>
  <span class="social-title">LinkedIn</span>
</a>


</div>

            </div>
          </div>

          <!-- Right on desktop / below right on phone: Beep -->
          <div class="footer-col footer-col--brand">
            <h4>Kappa Theta Pi Vandy</h4>
            <div class="footer-beep">
              <img src="/images/beep%20doodle.png" alt="Beep" class="beep-img">
            </div>
          </div>
        </div>

        <!-- Bottom (always centered) -->
        <div class="footer-bottom">
          <p>Developed and maintained by Rho Chapter</p>
          <p>© Kappa Theta Pi 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

// Inject footer
function injectFooter() {
  const footerHtml = createFooter();
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
}
