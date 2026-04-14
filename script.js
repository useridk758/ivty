const products = [
    { name: "Heavyweight Hoodie", category: "sweaters", price: "$85" },
    { name: "Boxy Tee", category: "shirts", price: "$45" },
    { name: "Technical Bomber", category: "jackets", price: "$120" },
    { name: "Cargo Trouser", category: "pants", price: "$95" },
    { name: "Knit Crewneck", category: "sweaters", price: "$75" },
    { name: "Graphic Tee", category: "shirts", price: "$40" }
];

function filterCategory(cat) {
    const container = document.getElementById('product-container');
    container.innerHTML = ""; // Clear current

    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <div class="placeholder-icon">IVTY-IMG</div>
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p>${p.price}</p>
                </div>
            </div>
        `;
    });

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === cat) btn.classList.add('active');
    });
}

// Initial Load
window.onload = () => filterCategory('all');
