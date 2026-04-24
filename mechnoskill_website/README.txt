========================================
  MECHNOSKILL WEBSITE — HOW TO RUN
========================================

FOLDER STRUCTURE:
  mechnoskill_website/
  ├── index.html          ← HOMEPAGE (start here)
  ├── shop.html           ← Product Catalog with filters
  ├── cart.html           ← Cart & Checkout (3 steps)
  ├── contact.html        ← Quote Request & Contact
  ├── account.html        ← Login / Register / Dashboard
  ├── brands.html         ← Brands page
  ├── industries.html     ← Industries page
  ├── about.html          ← About Us page
  ├── style.css           ← Global styles
  ├── components.js       ← Shared header/footer/cart JS
  └── assets/
      └── logo.jpg        ← Your Mechnoskill logo

========================================
  HOW TO RUN THE WEBSITE (3 methods)
========================================

METHOD 1 — EASIEST: Open directly in browser
  1. Extract the ZIP file
  2. Double-click index.html
  That's it! Works in Chrome, Edge, Firefox, Safari.

METHOD 2 — VS CODE Live Server (recommended for development):
  1. Install VS Code: https://code.visualstudio.com
  2. Open the mechnoskill_website folder in VS Code
  3. Install extension: "Live Server" by Ritwick Dey
  4. Right-click index.html → "Open with Live Server"
  5. Browser opens at: http://127.0.0.1:5500

METHOD 3 — Python (if you have Python installed):
  1. Open Terminal / Command Prompt
  2. Navigate to the folder:
       cd path/to/mechnoskill_website
  3. Run:
       python -m http.server 8080
  4. Open browser: http://localhost:8080

========================================
  WEBSITE FEATURES
========================================
✓ Sticky header with search, cart, account icons
✓ Real cart with localStorage (items saved between pages)
✓ Working search and category filters on Shop page
✓ Live product filtering by brand, price, rating
✓ Working Login / Register / Dashboard
✓ Cart → Checkout → Order Confirmation flow
✓ Quote & Contact forms with validation
✓ WhatsApp button linking to your number
✓ Responsive design (mobile friendly)
✓ Toast notifications for cart/wishlist actions
✓ Your logo throughout all pages

========================================
  CUSTOMIZING YOUR WEBSITE
========================================

TO CHANGE PHONE NUMBER:
  Open components.js
  Find: +966 9200 00000
  Replace with your real number

TO CHANGE EMAIL:
  Open components.js
  Find: support@mechnoskill.com
  Replace with your real email

TO CHANGE WHATSAPP:
  Open components.js
  Find: https://wa.me/966920000000
  Replace 966920000000 with your WhatsApp number

TO ADD REAL PRODUCTS:
  Open shop.html and index.html
  Find the allProducts array in the <script> section
  Add/edit product objects

TO CHANGE COLORS:
  Open style.css
  Find: #F5C800 (yellow) — replace with your color
  Find: #2b2b2b (charcoal) — replace with your color

========================================
  DEPLOYING ONLINE (making it live)
========================================

FREE HOSTING OPTIONS:
1. Netlify (easiest):
   - Go to netlify.com
   - Drag & drop the entire folder
   - Your site goes live instantly!

2. GitHub Pages (free):
   - Create GitHub account
   - Create new repository
   - Upload all files
   - Enable GitHub Pages in settings

3. Vercel:
   - Go to vercel.com
   - Connect GitHub or drag & drop

========================================
  SUPPORT
========================================
All files are plain HTML/CSS/JS — no 
frameworks, no build tools needed.
Works offline and online.

Built for Mechnoskill — Industrial Supplier
Dammam, Eastern Province, Saudi Arabia
========================================
