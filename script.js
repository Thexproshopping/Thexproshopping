let cart = [];

// Function to add products to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

// Function to render cart items
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = `${item.name} - ₹${item.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            renderCart();
        };
        div.appendChild(removeBtn);
        cartItems.appendChild(div);
        total += item.price;
    });

    cartTotal.textContent = total;
}

// Function for checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const summary = cart
        .map(item => `${item.name} - ₹${item.price}`)
        .join("\n");
    alert(`Order Summary:\n\n${summary}\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`);
    cart = [];
    renderCart();
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}
