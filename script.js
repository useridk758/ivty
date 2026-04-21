const products = [
    { 
        id: 1, 
        name: "STRUCTURE 01 - ADAM", 
        category: "shirts", 
        price: 45, 
        frontImg: "https://www.image2url.com/r2/default/images/1776736737916-2298b0a1-0b43-423e-b708-d65afee2e92d.png", 
        backImg: "https://www.image2url.com/r2/default/images/1776736808881-2157a855-9909-4354-b469-3a07256e7327.png" 
    },
    { id: 2, name: "IVTY V1 Hoodie", category: "sweaters", price: 85, frontImg: "", backImg: "" },
    { id: 3, name: "Technical Bomber", category: "jackets", price: 150, frontImg: "", backImg: "" },
    { id: 4, name: "Utility Cargo", category: "pants", price: 110, frontImg: "", backImg: "" }
];

let cart = JSON.parse(localStorage.getItem('ivty_cart')) || [];

// Handle Intro Animation
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('loading-overlay');
    const mainTitle = document.querySelector('.giant-text');
    
    setTimeout(() => {
        if(overlay) overlay.classList.add('fade-out');
        if(mainTitle) mainTitle.classList.add('reveal');
    }, 2000);
});

function filterCategory(cat, btn) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = "";
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    filtered.forEach(p => {
        const displayImg = p.frontImg || `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23111"/><text x="50%" y="50%" fill="%23333" font-family="sans-serif" font-weight="bold" text-anchor="middle">IVTY</text></svg>`;
        
        container.innerHTML += `
            <div class="product-card" id="prod-${p.id}">
                <div class="image-container">
                    <img src="${displayImg}" class="product-img" id="img-${p.id}">
                    ${p.backImg ? `
                    <div class="view-toggle">
                        <button class="dot active" onclick="flipImage(${p.id}, 'front')"></button>
                        <button class="dot" onclick="flipImage(${p.id}, 'back')"></button>
                    </div>` : ''}
                </div>
                <h4>${p.name}</h4>
                <p>$${p.price}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        `;
    });
}

function flipImage(id, side) {
    const product = products.find(p => p.id === id);
    const imgElement = document.getElementById(`img-${id}`);
    const dots = document.querySelectorAll(`#prod-${id} .dot`);
    
    if (side === 'front') {
        imgElement.src = product.frontImg;
        dots[0].classList.add('active');
        dots[1].classList.remove('active');
    } else {
        imgElement.src = product.backImg;
        dots[0].classList.remove('active');
        dots[1].classList.add('active');
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push({...product, cartId: Date.now()});
    updateCartUI();
    if(!document.getElementById('cart-sidebar').classList.contains('open')) toggleCart();
}

function updateCartUI() {
    localStorage.setItem('ivty_cart', JSON.stringify(cart));
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
    
    const list = document.getElementById('cart-items-list');
    if (!list) return;
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <div><h5>${item.name}</h5><p>$${item.price}</p></div>
                <button style="color:red;border:none;background:none;cursor:pointer;" onclick="removeItem(${item.cartId})">X</button>
            </div>
        `;
    });
    document.getElementById('cart-total-price').innerText = `$${total}`;
}

function removeItem(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function startCheckout() {
    if(cart.length === 0) return alert("Your cart is empty!");
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function processPayment() {
    alert("ORDER RECEIVED. THANK YOU FOR JOINING THE COLLECTIVE.");
    cart = [];
    updateCartUI();
    closeCheckout();
    toggleCart();
}

window.onload = () => {
    filterCategory('all', document.querySelector('.filter-btn'));
    updateCartUI();
};
