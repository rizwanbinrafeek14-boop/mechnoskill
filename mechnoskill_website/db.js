/* =============================================
   MECHNOSKILL — SHARED DATABASE (localStorage)
   Single source of truth for ALL pages
   ============================================= */

const MDB = {

  // ---- PRODUCTS ----
  getProducts() {
    try {
      const p = localStorage.getItem('ms_products');
      if (p) return JSON.parse(p);
    } catch(e) {}
    // Default products
    const defaults = [
      {id:'p1',name:'Deep Groove Ball Bearing 6205-2RS',brand:'SKF',sku:'MNS-BRG-6205',price:48,badge:'FEATURED',rating:5,reviews:48,cat:'bearings',stock:150,desc:'High-quality sealed ball bearing for industrial use.',image:''},
      {id:'p2',name:'Professional Hex Bolt Set M8x50 SS316',brand:'STANLEY',sku:'MNS-FST-8050',price:22.5,badge:'NEW',rating:4,reviews:31,cat:'fasteners',stock:500,desc:'Stainless steel hex bolt set, pack of 50.',image:''},
      {id:'p3',name:'Full Face Respirator with P100 Filter',brand:'HONEYWELL',sku:'MNS-SAF-FFR1',price:185,badge:'',rating:5,reviews:67,cat:'safety',stock:80,desc:'Full protection respiratory mask with P100 filter.',image:''},
      {id:'p4',name:'Industrial Angle Grinder 850W 115mm',brand:'BOSCH',sku:'MNS-TLS-AG115',price:320,badge:'SALE',rating:4,reviews:22,cat:'tools',stock:35,desc:'Heavy-duty angle grinder for metal and masonry.',image:''},
      {id:'p5',name:'Cylindrical Roller Bearing NU 2210',brand:'FAG',sku:'MNS-BRG-NU2210',price:185,badge:'NEW',rating:4,reviews:22,cat:'bearings',stock:60,desc:'High load capacity cylindrical roller bearing.',image:''},
      {id:'p6',name:'Safety Helmet V-Gard Yellow',brand:'MSA',sku:'MNS-SAF-HLM1',price:68,badge:'',rating:5,reviews:44,cat:'safety',stock:200,desc:'MSA V-Gard safety helmet, meets ANSI/ISEA Z89.1.',image:''},
      {id:'p7',name:'Cordless Drill 18V LXT Kit DHP481',brand:'MAKITA',sku:'MNS-TLS-DHP481',price:480,badge:'FEATURED',rating:5,reviews:89,cat:'tools',stock:25,desc:'18V LXT brushless cordless driver drill kit.',image:''},
      {id:'p8',name:'Digital Clamp Meter FLUKE 376 FC',brand:'FLUKE',sku:'MNS-ELC-376FC',price:890,badge:'',rating:5,reviews:33,cat:'electrical',stock:18,desc:'True-RMS clamp meter with iFlex flexible current probe.',image:''},
      {id:'p9',name:'Angular Contact Bearing 7210 BEP',brand:'SKF',sku:'MNS-BRG-7210',price:92,badge:'',rating:5,reviews:19,cat:'bearings',stock:90,desc:'Single row angular contact ball bearing.',image:''},
      {id:'p10',name:'Pipe Fitting Elbow 90° 1" SS304',brand:'PARKER',sku:'MNS-PIP-ELB1',price:34,badge:'',rating:4,reviews:15,cat:'pipes',stock:300,desc:'Stainless steel 90° elbow pipe fitting.',image:''},
      {id:'p11',name:'Hydraulic Cylinder 50mm x 200mm',brand:'BOSCH',sku:'MNS-HYD-CYL50',price:720,badge:'',rating:4,reviews:8,cat:'hydraulics',stock:12,desc:'Double-acting hydraulic cylinder, 50mm bore.',image:''},
      {id:'p12',name:'Safety Gloves Cut-Resistant Level E',brand:'HONEYWELL',sku:'MNS-SAF-GLV1',price:28,badge:'NEW',rating:4,reviews:55,cat:'safety',stock:400,desc:'Level E cut-resistant safety gloves, EN388 certified.',image:''},
    ];
    this.saveProducts(defaults);
    return defaults;
  },
  saveProducts(products) {
    localStorage.setItem('ms_products', JSON.stringify(products));
  },
  addProduct(prod) {
    const products = this.getProducts();
    prod.id = 'p' + Date.now();
    products.push(prod);
    this.saveProducts(products);
    return prod;
  },
  updateProduct(id, data) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) { products[idx] = {...products[idx], ...data}; this.saveProducts(products); }
  },
  deleteProduct(id) {
    this.saveProducts(this.getProducts().filter(p => p.id !== id));
  },
  getProduct(id) {
    return this.getProducts().find(p => p.id === id) || null;
  },

  // ---- CART ----
  getCart() {
    try { return JSON.parse(localStorage.getItem('ms_cart') || '[]'); } catch(e) { return []; }
  },
  saveCart(cart) {
    localStorage.setItem('ms_cart', JSON.stringify(cart));
    this._updateCartBadges();
  },
  addToCart(id, name, brand, price, sku, image) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) { existing.qty++; }
    else { cart.push({id, name, brand, price, sku, image: image||'', qty:1}); }
    this.saveCart(cart);
    this.showToast('✓ Added to cart: ' + name.substring(0,30));
  },
  removeFromCart(id) {
    this.saveCart(this.getCart().filter(i => i.id !== id));
  },
  clearCart() {
    localStorage.removeItem('ms_cart');
    this._updateCartBadges();
  },
  getCartCount() {
    return this.getCart().reduce((s,i) => s + i.qty, 0);
  },
  getCartTotal() {
    return this.getCart().reduce((s,i) => s + i.price * i.qty, 0);
  },
  _updateCartBadges() {
    const count = this.getCartCount();
    document.querySelectorAll('#cartCount,.cart-badge').forEach(el => el.textContent = count || '');
  },

  // ---- WISHLIST ----
  getWishlist() {
    try { return JSON.parse(localStorage.getItem('ms_wish') || '[]'); } catch(e) { return []; }
  },
  toggleWishlist(id, name) {
    let wish = this.getWishlist();
    if (wish.includes(id)) {
      wish = wish.filter(i => i !== id);
      this.showToast('Removed from wishlist');
    } else {
      wish.push(id);
      this.showToast('♥ Added to wishlist: ' + (name||'').substring(0,30));
    }
    localStorage.setItem('ms_wish', JSON.stringify(wish));
    this._updateWishBadges();
  },
  isWishlisted(id) {
    return this.getWishlist().includes(id);
  },
  _updateWishBadges() {
    const count = this.getWishlist().length;
    document.querySelectorAll('#wishCount').forEach(el => el.textContent = count || '');
  },

  // ---- ORDERS ----
  getOrders() {
    try { return JSON.parse(localStorage.getItem('ms_orders') || '[]'); } catch(e) { return []; }
  },
  addOrder(order) {
    const orders = this.getOrders();
    order.id = '#MNS-' + Math.floor(10000 + Math.random()*90000);
    order.date = new Date().toLocaleDateString('en-SA', {year:'numeric',month:'long',day:'numeric'});
    order.status = 'Processing';
    orders.unshift(order);
    localStorage.setItem('ms_orders', JSON.stringify(orders));
    return order;
  },

  // ---- QUOTES ----
  getQuotes() {
    try { return JSON.parse(localStorage.getItem('ms_quotes') || '[]'); } catch(e) { return []; }
  },
  addQuote(quote) {
    const quotes = this.getQuotes();
    quote.id = '#QT-' + Math.floor(1000 + Math.random()*9000);
    quote.date = new Date().toLocaleDateString('en-SA', {year:'numeric',month:'long',day:'numeric'});
    quote.status = 'Pending';
    quotes.unshift(quote);
    localStorage.setItem('ms_quotes', JSON.stringify(quotes));
    return quote;
  },

  // ---- USER ----
  getUser() {
    try { return JSON.parse(localStorage.getItem('ms_user') || 'null'); } catch(e) { return null; }
  },
  setUser(user) {
    localStorage.setItem('ms_user', JSON.stringify(user));
  },
  clearUser() {
    localStorage.removeItem('ms_user');
  },

  // ---- SETTINGS ----
  getSettings() {
    try {
      const s = localStorage.getItem('ms_settings');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return {
      phone: '+966 9200 00000',
      whatsapp: '966920000000',
      email: 'support@mechnoskill.com',
      address: 'King Fahad Street, Dammam, Eastern Province, Saudi Arabia',
      hours: 'Sun–Thu: 8:00 AM – 6:00 PM',
      primaryColor: '#F5C800',
      vatInclusive: true,
      showWhatsapp: true,
      adminUser: 'admin',
      adminPass: 'admin123'
    };
  },
  saveSettings(s) {
    localStorage.setItem('ms_settings', JSON.stringify(s));
  },

  // ---- STAR HTML ----
  stars(r) {
    return '<span style="color:#F5C800">' + '★'.repeat(r) + '</span><span style="color:#ddd">' + '★'.repeat(5-r) + '</span>';
  },

  // ---- PRODUCT CARD HTML ----
  productCardHTML(p) {
    const wish = this.isWishlisted(p.id);
    const badgeClass = p.badge==='NEW'?'new-badge':p.badge==='SALE'?'sale-badge':'';
    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" style="max-height:130px;max-width:130px;object-fit:contain">`
      : `<svg viewBox="0 0 24 24" style="width:56px;height:56px;stroke:#c0c0c0;fill:none;stroke-width:1.2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>`;
    return `<div class="prod-card" onclick="window.location='product.html?id=${p.id}'">
      <div class="prod-img">
        ${imgHTML}
        ${p.badge ? `<div class="prod-badge ${badgeClass}">${p.badge}</div>` : ''}
        <div class="prod-wish ${wish?'wishlisted':''}" onclick="event.stopPropagation();MDB.toggleWishlist('${p.id}','${p.name}');this.classList.toggle('wishlisted')" title="${wish?'Remove from wishlist':'Add to wishlist'}">
          <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:${wish?'#F5C800':'none'};stroke:${wish?'#F5C800':'#ccc'};stroke-width:1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
      </div>
      <div class="prod-info">
        <div class="prod-brand">${p.brand}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-sku">SKU: ${p.sku}</div>
        <div>${this.stars(p.rating)}<span class="prod-reviews"> (${p.reviews})</span></div>
        <div class="prod-bottom">
          <div class="prod-price">SAR ${p.price.toFixed(2)}<small>Incl. VAT</small></div>
          <button class="add-btn" onclick="event.stopPropagation();MDB.addToCart('${p.id}','${p.name}','${p.brand}',${p.price},'${p.sku}','${p.image||''}')">+ Add</button>
        </div>
        <div style="text-align:center;margin-top:5px"><a href="contact.html" style="font-size:10px;color:#F5C800;font-weight:700" onclick="event.stopPropagation()">Request Quote</a></div>
      </div>
    </div>`;
  },

  // ---- TOAST ----
  showToast(msg) {
    let t = document.getElementById('ms-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ms-toast';
      t.style.cssText = 'position:fixed;bottom:90px;right:24px;background:#2b2b2b;color:#fff;padding:12px 18px;border-radius:6px;font-size:13px;font-weight:600;z-index:9999;transition:opacity .3s;border-left:4px solid #F5C800;max-width:300px;line-height:1.4;pointer-events:none';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.style.opacity = '0', 3000);
  },

  // ---- INIT (call on every page) ----
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this._updateCartBadges();
      this._updateWishBadges();
    });
  }
};

// Global helpers (backwards compat)
function addToCart(id,name,brand,price,sku,image){ MDB.addToCart(id,name,brand,price,sku,image); }
function toggleWishlist(id,name){ MDB.toggleWishlist(id,name); }
function showToast(msg){ MDB.showToast(msg); }

MDB.init();
