// Sample product data
const products = [
    { id: 1, name: 'Smart Watch', price: 2999, image: 'https://via.placeholder.com/250', category: 'above-2000' },
    { id: 2, name: 'Wireless Earbuds', price: 799, image: 'https://via.placeholder.com/250', category: '500-1000' },
    { id: 3, name: 'Gaming Headset', price: 1500, image: 'https://via.placeholder.com/250', category: '1000-2000' },
    { id: 4, name: 'Smartphone', price: 12000, image: 'https://via.placeholder.com/250', category: 'above-2000' },
    { id: 5, name: 'Laptop', price: 25000, image: 'https://via.placeholder.com/250', category: 'above-2000' },
    { id: 6, name: 'Bluetooth Speaker', price: 1200, image: 'https://via.placeholder.com/250', category: '1000-2000' },
    { id: 7, name: 'Power Bank', price: 499, image: 'https://via.placeholder.com/250', category: 'under-500' },
    { id: 8, name: 'Smart Glasses', price: 5000, image: 'https://via.placeholder.com/250', category: 'above-2000' },
    { id: 9, name: 'Fitness Tracker', price: 1500, image: 'https://via.placeholder.com/250', category: '1000-2000' },
    { id: 10, name: 'Air Conditioner', price: 35000, image: 'https://via.placeholder.com/250', category: 'above-2000' }
];

// Render products
function renderProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';  // Clear the existing products
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// Product Search
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    renderProducts(filteredProducts);
}

// Filter products by price
function filterProductsByPrice() {
    const filterValue = document.getElementById('filter-price').value;
    let filteredProducts;

    if (filterValue === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === filterValue);
    }

    renderProducts(filteredProducts);
}

// Cart functionality
let cart = [];

function addToCart(id, name, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <span>₹${item.price}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

function checkout() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    if (name && email && phone) {
        alert('Order placed successfully!');
        sendOrderEmail(name, email, phone, cart);
    } else {
        alert('Please fill out all fields');
    }
}

// Function to send order details to the email
function sendOrderEmail(name, email, phone, cart) {
    const orderDetails = {
        name,
        email,
        phone,
        items: cart.map(item => `${item.name} - ₹${item.price}`).join(', '),
        total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    };

    emailjs.send('service_qo8786l', 'template_546v0pe', orderDetails, '6TnvROhWhdqwmbcjC')
        .then(response => {
            console.log('Order email sent', response);
        })
        .catch(error => {
            console.log('Error sending email', error);
        });
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});
