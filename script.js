const products = [
    { 
        id: 1, 
        name: "STRUCTURE 01 - ADAM", 
        category: "shirts", 
        price: 45, 
        // Corrected: Front (IVTY Text) first
        frontImg: "https://www.image2url.com/r2/default/images/1776736737916-2298b0a1-0b43-423e-b708-d65afee2e92d.png", 
        backImg: "https://www.image2url.com/r2/default/images/1776736808881-2157a855-9909-4354-b469-3a07256e7327.png" 
    },
    { 
        id: 2, 
        name: "STRUCTURE 02 - REFINED", 
        category: "shirts", 
        price: 50, 
        // Corrected: Front (Vitruvian Man) first
        frontImg: "https://i.im.ge/eB3p7T/image.png", 
        backImg: "https://i.im.ge/eB3vAc/image.png" 
    }
];

let cart = [];

window.onload = () => {
    filterCategory('all');
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.add('fade-out');
    }, 1200);
};

function filterCategory(cat, btn = null) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = "";
    
    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const activeProducts = products.filter(p => p.frontImg && p.frontImg !== "");
    const filtered = cat === 'all' ? activeProducts : activeProducts.filter(p => p.category === cat);
    
    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card" id="prod-${p.id}">
                <div class="image-container">
                    <img src="${p.frontImg}" class="product-img" id="img-display-${p.id}">
                    <div class="view-toggle">
                        <button class="dot active" onclick="swapView(${p.id}, '${p.frontImg}', this)"></button>
                        <button class="dot" onclick="swapView(${p.id}, '${p.backImg}', this)"></button>
                    </div>
                </div>
                <h4>${p.name}</h4>
                <p>$${p.price}</p>
                <button class="final-btn" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        `;
    });
}

function swapView(id, url, btn) {
    const displayImg = document.getElementById(`img-display-${id}`);
    if (displayImg) displayImg.src = url;
    const dots = btn.parentElement.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    btn.classList.add('active');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push({...product, cartInstanceId: Date.now()});
        updateCart();
        if (!document.getElementById('cart-sidebar').classList.contains('open')) {
            toggleCart();
        }
    }
}

function removeItem(instanceId) {
    cart = cart.filter(item => item.cartInstanceId !== instanceId);
    updateCart();
}

function updateCart() {
    const list = document.getElementById('cart-items-list');
    const count = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total-price');
    
    list.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <div>
                    <h5>${item.name}</h5>
                    <p>$${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeItem(${item.cartInstanceId})">REMOVE</button>
            </div>
        `;
    });
    
    if (count) count.innerText = cart.length;
    if (totalEl) totalEl.innerText = `$${total}`;
}

function startCheckout() {
    if (cart.length === 0) return alert("Your cart is empty.");
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function processPayment() {
    alert("ORDER RECEIVED. THE COLLECTIVE HAS BEEN UPDATED.");
    cart = [];
    updateCart();
    closeCheckout();
    toggleCart();
}
