// Updated Product Database with Swapped front/back images and new items
const products = [
    { 
        id: 1, 
        name: "STRUCTURE 01 - ADAM", 
        category: "shirts", 
        price: 45, 
        // Images swapped to Front, then Back
        frontImg: "https://www.image2url.com/r2/default/images/1776736737916-2298b0a1-0b43-423e-b708-d65afee2e92d.png", 
        backImg: "https://www.image2url.com/r2/default/images/1776736808881-2157a855-9909-4354-b469-3a07256e7327.png" 
    },
    { 
        id: 2, 
        name: "STRUCTURE 02 - REFINED", 
        category: "shirts", 
        price: 50, 
        // Images swapped to Front, then Back
        frontImg: "https://i.im.ge/eB3p7T/image.png", 
        backImg: "https://i.im.ge/eB3vAc/image.png" 
    },
    { 
        id: 3, 
        name: "UTIL Shorts - VOID", 
        category: "shorts", 
        price: 65, 
        frontImg: "https://i.postimg.cc/bGs8R8KK/image.png", 
        backImg: "" // No back image provided
    },
    { 
        id: 4, 
        name: "STRUCTURE Pants - ANATOMY", 
        category: "pants", 
        price: 80, 
        frontImg: "https://i.postimg.cc/0yY50yTk/image.png", 
        backImg: "" 
    },
    { 
        id: 5, 
        name: "UTIL Jeans - CREATION", 
        category: "jeans", 
        price: 110, 
        frontImg: "https://i.postimg.cc/Jnn18cGh/image.png", 
        backImg: "" 
    },
    // Items with no images that were removed
    { id: 6, name: "Technical Bomber", category: "jackets", price: 150, frontImg: "", backImg: "" },
    { id: 7, name: "Utility Cargo", category: "pants", price: 110, frontImg: "", backImg: "" }
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

// Category Filtering & Product Display
function filterCategory(cat, btn) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = "";
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    // ONLY FILTER ITEMS THAT HAVE AN ACTIVE IMAGE
    const activeProducts = products.filter(p => p.frontImg !== "");
    const filtered = cat === 'all' ? activeProducts : activeProducts.filter(p => p.category === cat);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card" id="prod-${p.id}">
                <div class="image-container">
                    <img src="${p.frontImg}" class="product-img" id="img-${p.id}">
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

// Function to handle image toggling
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

// Cart System Functions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    // Add item with a unique instance ID for removal
    cart.push({...product, cartInstanceId: Date.now()});
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
                <button class="remove-item-btn" onclick="removeItem(${item.cartInstanceId})">REMOVE</button>
            </div>
        `;
    });
    document.getElementById('cart-total-price').innerText = `$${total}`;
}

function removeItem(instanceId) {
    cart = cart.filter(item => item.cartInstanceId !== instanceId);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

// Checkout Flow
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

// Initialization
window.onload = () => {
    // Set initial filter to 'all' and update active button state
    filterCategory('all', document.querySelector('.sidebar .filter-btn'));
    updateCartUI();
};
