// Initialize EmailJS with your public key
emailjs.init('6TnvROhWhdqwmbcjC');

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

// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// Add product to cart
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Render cart items
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <span>₹${item.price}</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });
    cartTotal.textContent = total;
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item from the cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
    renderCart(); // Re-render the cart
}

// Checkout and send order details via EmailJS
function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (name && email && phone) {
        // Send the order details to EmailJS
        emailjs.send("service_qo8786l", "template_546v0pe", {
            from_name: name,
            to_name: "TheXproShopping",
            message: `
                Order Summary:
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Items: ${JSON.stringify(cart)}
            ` 
        })
        .then(function(response) {
            alert("Order placed successfully! Check your email for the order summary.");
            localStorage.clear();  // Clear cart after successful order
            window.location.href = "index.html";  // Redirect to home page
        })
        .catch(function(error) {
            console.error("Error sending email:", error);
        });
    } else {
        alert("Please fill all the fields.");
    }
}

// Product Search function
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);
}

// Filter products by price
function filterProductsByPrice() {
    const filter = document.getElementById('filter-price').value;
    let filteredProducts;
    if (filter === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === filter);
    }
    renderProducts(filteredProducts);
}

// Initialize products and cart
renderProducts(products);
if (location.pathname.includes("cart.html")) {
    renderCart();
}
