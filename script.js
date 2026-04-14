const products = [
    { id: 1, name: "IVTY V1 Hoodie", category: "sweaters", price: 85 },
    { id: 2, name: "IVTY Essential Tee", category: "shirts", price: 45 },
    { id: 3, name: "Technical Windbreaker", category: "jackets", price: 150 },
    { id: 4, name: "Relaxed Cargo", category: "pants", price: 110 },
    { id: 5, name: "IVTY Knit Sweat", category: "sweaters", price: 95 },
    { id: 6, name: "Oversized Blank", category: "shirts", price: 35 }
];

let cart = JSON.parse(localStorage.getItem('ivty_cart')) || [];

function filterCategory(cat, btn) {
    const container = document.getElementById('product-container');
    container.innerHTML = "";
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <div class="placeholder-icon">IVTY-${p.category.toUpperCase()}</div>
                <h4>${p.name}</h4>
                <p>$${p.price}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push({...product, cartId: Date.now()}); // Unique ID for removals
    updateCartUI();
    if(!document.getElementById('cart-sidebar').classList.contains('open')) {
        toggleCart();
    }
}

function removeItem(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('ivty_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    
    const list = document.getElementById('cart-items-list');
    list.innerHTML = "";
    
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <div>
                    <h5 style="margin:0">${item.name}</h5>
                    <small>$${item.price}</small>
                </div>
                <button class="remove-btn" onclick="removeItem(${item.cartId})">REMOVE</button>
            </div>
        `;
    });
    
    document.getElementById('cart-total-price').innerText = `$${total}`;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

// Ensure the shop loads immediately
window.onload = () => {
    filterCategory('all', document.querySelector('.filter-btn'));
    updateCartUI();
};
