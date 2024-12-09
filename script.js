let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <p>${item.name} - ₹${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });

    cartTotal.textContent = total;
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Checkout
function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (name && email && phone) {
        alert("Order placed successfully!");
        localStorage.clear();
        renderCart();
    } else {
        alert("Please fill out all fields!");
    }
}

// Initialize cart on cart page
if (location.pathname.includes("cart.html")) {
    renderCart();
}

// Scroll to section
function scrollToSection(section) {
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
}
