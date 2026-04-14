const products = [
    { id: 1, name: "IVTY Heavy Hoodie", category: "sweaters", price: 85 },
    { id: 2, name: "IVTY Boxy Tee", category: "shirts", price: 45 },
    { id: 3, name: "V1 Technical Bomber", category: "jackets", price: 120 },
    { id: 4, name: "Utility Cargo", category: "pants", price: 95 },
    { id: 5, name: "Knit Crewneck", category: "sweaters", price: 75 },
    { id: 6, name: "Logo Tee", category: "shirts", price: 40 }
];

let cart = JSON.parse(localStorage.getItem('ivty-cart')) || [];

function filterCategory(cat, btn) {
    const container = document.getElementById('product-container');
    container.innerHTML = "";
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <div class="placeholder-icon">[IMAGE PLACEHOLDER]</div>
                <h4>${p.name}</h4>
                <p>$${p.price}</p>
                <button class="add-to-cart" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    localStorage.setItem('ivty-cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        itemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price} <button onclick="removeItem(${index})">X</button></span>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = `$${total}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

window.onload = () => {
    filterCategory('all', document.querySelector('.filter-btn'));
    updateCart();
};
