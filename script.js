let cart = [];

// Add to Cart
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
}

// Render Cart
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
        cartContainer.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
        total += item.price;
    });

    totalContainer.textContent = total;
}

// Checkout
function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = cartItems.map(item => `${item.name} - ₹${item.price}`).join(", ");

    // Use EmailJS to send the order summary
    emailjs.send("service_xxxxx", "template_xxxxx", {
        user_name: name,
        user_email: email,
        user_phone: phone,
        order_details: orderSummary,
        order_total: document.getElementById("cart-total").textContent
    }).then(() => {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        location.reload();
    });
}

// Initialize Cart Page
if (location.pathname.endsWith("cart.html")) {
    renderCart();
}
