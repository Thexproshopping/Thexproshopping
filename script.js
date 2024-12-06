// Cart data
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
    cartItems.innerHTML = ""; // Clear previous items
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

// Function for checkout (console only)
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    console.log("Order Summary:", cart);
    cart = [];
    renderCart();
}

// Scroll to Products Section
function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}
