// AURA Shared Interactivity Script

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Layout Elements (Header, Footer, Cart Drawer, Modal)
  injectLayout();

  // 2. Set Active Navigation Page Link
  setActiveNavLink();

  // 3. Initialize Global Event Listeners
  initGlobalEventListeners();

  // 4. Update Cart UI count & items
  updateCartUI();
});

// Dynamically inject shared components to keep code DRY and maintain premium look
function injectLayout() {
  const currentPath = window.location.pathname;
  const isIndex = currentPath.endsWith('index.html') || currentPath.endsWith('/') || !currentPath.includes('.html');
  const basePath = ''; // Everything is in the root directory

  // A. Header HTML
  const headerHTML = `
    <div class="logo">
      <a href="${basePath}index.html">
        <img src="${basePath}assets/logo.png" alt="AURA Logo">
        <span class="logo-text">AURA</span>
      </a>
    </div>
    <nav class="nav-links" id="navLinks">
      <a href="${basePath}index.html" data-page="index">首頁</a>
      <a href="${basePath}about.html" data-page="about">品牌故事</a>
      <a href="${basePath}men.html" data-page="men">男士系列</a>
      <a href="${basePath}women.html" data-page="women">女士系列</a>
      <a href="${basePath}kids.html" data-page="kids">童鞋系列</a>
      <a href="${basePath}accessories.html" data-page="accessories">鞋履配件</a>
      <a href="${basePath}contact.html" data-page="contact">聯絡我們</a>
    </nav>
    <div class="header-icons">
      <button class="icon-btn" id="cartToggleBtn" aria-label="Shopping Cart">
        🛒<span class="cart-count" id="cartCount">0</span>
      </button>
      <button class="icon-btn menu-toggle" id="menuToggleBtn" aria-label="Toggle Menu">
        ☰
      </button>
    </div>
  `;

  // B. Cart Drawer & Overlay HTML
  const cartDrawerHTML = `
    <div class="cart-overlay" id="cartOverlay"></div>
    <div class="cart-drawer" id="cartDrawer">
      <div class="cart-header">
        <h2>購物袋 (<span id="cartHeaderCount">0</span>)</h2>
        <button class="close-cart" id="closeCartBtn">&times;</button>
      </div>
      <div class="cart-items-container" id="cartItemsContainer">
        <!-- Dynamic Cart Items Inject Here -->
      </div>
      <div class="cart-footer">
        <div class="cart-summary-row">
          <span>總計</span>
          <span id="cartSubtotal">NT$ 0</span>
        </div>
        <button class="btn btn-gold checkout-btn" id="checkoutBtn">前往結帳</button>
      </div>
    </div>
  `;

  // C. Quick View Modal HTML
  const quickViewModalHTML = `
    <div class="modal" id="quickViewModal">
      <div class="modal-overlay" id="modalOverlay"></div>
      <div class="modal-content">
        <button class="close-modal" id="closeModalBtn">&times;</button>
        <div class="modal-image">
          <img src="" id="modalImg" alt="Product Image">
        </div>
        <div class="modal-info">
          <span class="detail-category" id="modalCategory">Category</span>
          <h2 class="detail-name" id="modalName">Product Name</h2>
          <span class="detail-english" id="modalEnglishName">English Name</span>
          <div class="detail-price" id="modalPrice">NT$ 0</div>
          <p class="detail-description" id="modalDesc">Description goes here...</p>
          <div class="detail-size-section">
            <div class="size-label">
              <span>選擇尺寸</span>
            </div>
            <div class="size-selector" id="modalSizeSelector">
              <!-- Sizes -->
            </div>
          </div>
          <div class="detail-actions">
            <div class="detail-qty">
              <button type="button" id="modalQtyMinus">-</button>
              <input type="number" id="modalQtyInput" value="1" min="1" readonly>
              <button type="button" id="modalQtyPlus">+</button>
            </div>
            <button class="btn btn-gold detail-add-btn" id="modalAddToCartBtn">加入購物袋</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // D. Footer HTML
  const footerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>AURA</h3>
        <p>精湛的工藝，極致的舒適。AURA 致力於打造頂級時尚的優雅履鞋，陪伴您的每一步精彩旅程。</p>
        <div class="footer-socials">
          <a href="#" class="social-link">🅵</a>
          <a href="#" class="social-link">🅸</a>
          <a href="#" class="social-link">🆃</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>系列瀏覽</h4>
        <ul>
          <li><a href="${basePath}men.html">男士精選</a></li>
          <li><a href="${basePath}women.html">女士時尚</a></li>
          <li><a href="${basePath}kids.html">童趣系列</a></li>
          <li><a href="${basePath}accessories.html">精緻配件</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>品牌服務</h4>
        <ul>
          <li><a href="${basePath}about.html">關於我們</a></li>
          <li><a href="${basePath}contact.html">實體店面</a></li>
          <li><a href="#">售後保養</a></li>
          <li><a href="#">常見問題</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>訂閱電子報</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">獲取 AURA 最新系列發佈與尊榮會員優惠資訊。</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); alert('感謝您的訂閱！'); this.reset();">
          <input type="email" placeholder="輸入您的電子信箱" required>
          <button type="submit" class="newsletter-submit">→</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 AURA FOOTWEAR. 版權所有。由 Antigravity AI 設計開發</p>
      <p>隱私權條款 | 服務條款</p>
    </div>
  `;

  // Insert into DOM
  // We assume the HTML page has empty tags: <header id="globalHeader"></header>, <div id="globalCart"></div>, <footer id="globalFooter"></footer>
  const headerElement = document.getElementById('globalHeader');
  if (headerElement) headerElement.innerHTML = headerHTML;

  const footerElement = document.getElementById('globalFooter');
  if (footerElement) footerElement.innerHTML = footerHTML;

  const cartContainer = document.getElementById('globalCart');
  if (cartContainer) {
    cartContainer.innerHTML = cartDrawerHTML + quickViewModalHTML;
  } else {
    // Fallback if container does not exist
    const div = document.createElement('div');
    div.id = 'globalCart';
    div.innerHTML = cartDrawerHTML + quickViewModalHTML;
    document.body.appendChild(div);
  }

  // Set Header Scrolled State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerElement?.classList.add('scrolled');
    } else {
      headerElement?.classList.remove('scrolled');
    }
  });
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const pageAttr = link.getAttribute('data-page');
    if (currentPath.includes(pageAttr + '.html') || (pageAttr === 'index' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initGlobalEventListeners() {
  // Cart Drawer open/close
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Mobile Menu Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Quick View Modal close
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeQuickView);
  if (modalOverlay) modalOverlay.addEventListener('click', closeQuickView);

  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('您的購物袋是空的！');
        return;
      }
      alert('感謝您的訂購！本專案為靜態示範網站，結帳功能已模擬完成。');
      cart = [];
      saveCart();
      updateCartUI();
      closeCart();
    });
  }
}

// Shopping Cart Core Functions
function openCart() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent page scroll
}

function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function saveCart() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function addToCart(productId, size, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Check if item with same ID and size exists
  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCount = document.getElementById('cartCount');
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const cartSubtotal = document.getElementById('cartSubtotal');

  if (!cartItemsContainer) return;

  // Total quantity calculation
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalQty;
  if (cartHeaderCount) cartHeaderCount.textContent = totalQty;

  // Render items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <div class="cart-empty-icon">👜</div>
        <p>您的購物袋是空的</p>
        <button class="btn btn-secondary" style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; font-size: 0.8rem;" onclick="closeCart()">繼續選購</button>
      </div>
    `;
    if (cartSubtotal) cartSubtotal.textContent = 'NT$ 0';
    return;
  }

  let subtotal = 0;
  let itemsHTML = '';

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    itemsHTML += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">尺寸: ${item.size}</div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
              <div class="qty-val">${item.quantity}</div>
              <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">NT$ ${itemTotal.toLocaleString()}</div>
          </div>
          <button class="remove-cart-item" onclick="removeFromCart(${index})" style="align-self: flex-start; margin-top: 0.5rem; background:none; border:none; cursor:pointer;">移除</button>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = itemsHTML;
  if (cartSubtotal) cartSubtotal.textContent = `NT$ ${subtotal.toLocaleString()}`;
}

// Quick View Modal Functions
let selectedQuickViewSize = null;

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalName = document.getElementById('modalName');
  const modalEnglishName = document.getElementById('modalEnglishName');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalSizeSelector = document.getElementById('modalSizeSelector');

  if (!modal) return;

  // Set details
  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalCategory.textContent = product.categoryName;
  modalName.textContent = product.name;
  modalEnglishName.textContent = product.englishName;
  modalPrice.textContent = `NT$ ${product.price.toLocaleString()}`;
  modalDesc.textContent = product.description;

  // Set sizes selection
  selectedQuickViewSize = product.sizes[0]; // default select first size
  let sizesHTML = '';
  product.sizes.forEach(size => {
    const isSelected = size === selectedQuickViewSize ? 'selected' : '';
    sizesHTML += `<button class="size-option ${isSelected}" data-size="${size}">${size}</button>`;
  });
  modalSizeSelector.innerHTML = sizesHTML;

  // Add click listener on sizes
  const sizeButtons = modalSizeSelector.querySelectorAll('.size-option');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      sizeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedQuickViewSize = btn.getAttribute('data-size');
    });
  });

  // Reset quantity input
  const qtyInput = document.getElementById('modalQtyInput');
  if (qtyInput) qtyInput.value = 1;

  // Setup modal quantity buttons
  const qtyMinus = document.getElementById('modalQtyMinus');
  const qtyPlus = document.getElementById('modalQtyPlus');
  
  // Clean listeners by replacing elements
  const newQtyMinus = qtyMinus.cloneNode(true);
  const newQtyPlus = qtyPlus.cloneNode(true);
  qtyMinus.parentNode.replaceChild(newQtyMinus, qtyMinus);
  qtyPlus.parentNode.replaceChild(newQtyPlus, qtyPlus);

  newQtyMinus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    if (val > 1) qtyInput.value = val - 1;
  });
  newQtyPlus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    qtyInput.value = val + 1;
  });

  // Setup dynamic add to cart listener
  const addToCartBtn = document.getElementById('modalAddToCartBtn');
  const newAddToCartBtn = addToCartBtn.cloneNode(true);
  addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);

  newAddToCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value);
    addToCart(product.id, selectedQuickViewSize, qty);
    closeQuickView();
  });

  // Open modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('open');
  document.body.style.overflow = '';
}
