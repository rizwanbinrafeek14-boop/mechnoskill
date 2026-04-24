/* =============================================
   MECHNOSKILL — SHARED COMPONENTS (header/footer)
   Uses db.js for all data — include BOTH files
   ============================================= */

function renderHeader(activePage) {
  const pages = [
    ['index.html','Home'],['shop.html','Products'],['brands.html','Brands'],
    ['industries.html','Industries'],['about.html','About Us'],['contact.html','Contact']
  ];
  const navLinks = pages.map(([p,n]) =>
    `<a href="${p}" class="${p===activePage?'active':''}">${n}</a>`
  ).join('');
  const settings = typeof MDB !== 'undefined' ? MDB.getSettings() : {};
  const phone = settings.phone || '+966 9200 00000';
  const wa = settings.whatsapp || '966920000000';

  return `
  <div class="topbar">
    <span>🚚 Free delivery on orders over SAR 500 &nbsp;|&nbsp; VAT inclusive pricing</span>
    <span>📞 ${phone} &nbsp;
      <a href="mailto:${settings.email||'support@mechnoskill.com'}">${settings.email||'support@mechnoskill.com'}</a>
      <a href="#">العربية</a>
    </span>
  </div>
  <div class="header">
    <div class="logo-wrap">
      <img class="logo-img" src="assets/logo.jpg" alt="Mechnoskill Logo" onerror="this.style.display='none'">
      <div>
        <div class="logo-main">MECHNO<span>SKILL</span></div>
        <div class="logo-sub">Industrial Supplier — KSA</div>
      </div>
    </div>
    <div class="search-wrap">
      <select id="catSelect">
        <option>All Categories</option>
        <option>Bearings</option><option>Fasteners</option><option>Hydraulics</option>
        <option>Pneumatics</option><option>Safety Equipment</option>
        <option>Tools & Machinery</option><option>Electrical</option><option>Pipes & Fittings</option>
      </select>
      <input type="text" id="searchInput" placeholder="Search products, brands, part numbers..."
        onkeydown="if(event.key==='Enter')doSearch()">
      <button class="search-btn" onclick="doSearch()">⌕</button>
    </div>
    <div class="header-actions">
      <a href="account.html" class="icon-btn">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Account</span>
      </a>
      <a href="shop.html" class="icon-btn" style="position:relative">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="cart-badge" id="wishCount" style="background:#2b2b2b"></span>
        <span>Wishlist</span>
      </a>
      <a href="cart.html" class="icon-btn" style="position:relative">
        <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="cart-badge" id="cartCount"></span>
        <span>Cart</span>
      </a>
      <a href="contact.html" class="qbtn">Get a Quote</a>
    </div>
  </div>
  <nav class="nav">
    <a href="shop.html" class="mc">☰ &nbsp;All Categories</a>
    ${navLinks}
  </nav>`;
}

function renderFooter() {
  const settings = typeof MDB !== 'undefined' ? MDB.getSettings() : {};
  const wa = settings.whatsapp || '966920000000';
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo-wrap">
          <img src="assets/logo.jpg" alt="Mechnoskill" style="width:42px;height:42px;object-fit:contain;border-radius:4px" onerror="this.style.display='none'">
          <div class="footer-logo-text">MECHNO<span>SKILL</span></div>
        </div>
        <p class="footer-desc">Your trusted industrial supplier in Saudi Arabia. Quality tools, machinery, and components delivered nationwide.</p>
        <div class="social-links">
          <a href="#" class="soc-btn"><svg viewBox="0 0 24 24" width="13" height="13" fill="#555"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#" class="soc-btn"><svg viewBox="0 0 24 24" width="13" height="13" fill="#555"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></a>
          <a href="#" class="soc-btn"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#555" stroke-width="1.8"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
        </div>
      </div>
      <div>
        <div class="footer-title">Quick Links</div>
        <div class="footer-links">
          <a href="index.html">Home</a><a href="shop.html">Shop</a>
          <a href="brands.html">Brands</a><a href="industries.html">Industries</a>
          <a href="about.html">About Us</a><a href="contact.html">Contact</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Categories</div>
        <div class="footer-links">
          <a href="shop.html?cat=bearings">Bearings</a>
          <a href="shop.html?cat=fasteners">Fasteners</a>
          <a href="shop.html?cat=hydraulics">Hydraulics</a>
          <a href="shop.html?cat=safety">Safety Equipment</a>
          <a href="shop.html?cat=tools">Tools & Machinery</a>
          <a href="shop.html?cat=electrical">Electrical</a>
          <a href="shop.html?cat=pipes">Pipes & Fittings</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Contact Us</div>
        <div class="ci"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${settings.address||'King Fahad Street, Dammam, Eastern Province'}</div>
        <div class="ci"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/></svg>${settings.phone||'+966 9200 00000'}</div>
        <div class="ci"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${settings.email||'support@mechnoskill.com'}</div>
        <div class="ci"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${settings.hours||'Sun–Thu: 8:00 AM – 6:00 PM'}</div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Mechnoskill. All Rights Reserved.</span>
      <div class="pay-row">
        <span class="pay-icon">VISA</span><span class="pay-icon">MC</span>
        <span class="pay-icon">MADA</span><span class="pay-icon">COD</span><span class="pay-icon">BANK</span>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/${wa}" class="wa-btn" target="_blank">
    <svg viewBox="0 0 24 24" fill="white" width="26" height="26"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
  </a>`;
}

function doSearch() {
  const q = document.getElementById('searchInput')?.value?.trim();
  const cat = document.getElementById('catSelect')?.value;
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (cat && cat !== 'All Categories') params.set('cat', cat);
  window.location.href = 'shop.html' + (params.toString() ? '?' + params.toString() : '');
}
