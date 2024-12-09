let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <span>₹${item.price}</span>
            </div>
        `;
        total += item.price;
    });

    cartTotal.textContent = total;
}

function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (!name || !email || !phone) {
        alert("Please fill in all the required details.");
        return;
    }

    const cartSummary = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        message: cartSummary,
        total_price: totalPrice
    };

    emailjs
        .send("service_qo8786l", "template_546v0pe", templateParams, "6TnvROhWhdqwmbcjC")
        .then(
            (response) => {
                alert("Order placed successfully! A confirmation email has been sent.");
                localStorage.clear();
                location.reload();
            },
            (error) => {
                alert("Failed to send order details. Please try again later.");
                console.error("EmailJS Error:", error);
            }
        );
}

// Render cart if on the cart page
if (location.pathname.includes("cart.html")) {
    renderCart();
}
