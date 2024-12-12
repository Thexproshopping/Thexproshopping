// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load Products (Mock Data)
const products = [
    { name: "Laptop", price: 799, category: "electronics", image: "laptop.jpg" },
    { name: "T-shirt", price: 19, category: "clothing", image: "tshirt.jpg" },
    { name: "Novel", price: 10, category: "books", image: "novel.jpg" }
];

function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Add to Cart
function addToCart(index) {
    const product = products[index];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Load Cart
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const subtotal = document.getElementById('subtotal');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    subtotal.innerText = `Subtotal: $${total.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Event Listeners
document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);
document.getElementById('checkout-btn')?.addEventListener('click', () => alert('Checkout not implemented!'));

// Load Data
if (document.getElementById('product-list')) loadProducts();
if (document.getElementById('cart-items')) loadCart();
