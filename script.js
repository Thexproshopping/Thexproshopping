let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Function
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartStorage();
    alert(`${productName} added to cart!`);
}

// Render Cart
function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    if (!cart.length) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
        cartCount.textContent = "0";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>₹${item.price} x ${item.quantity}</p>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;
}

// Change Quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartStorage();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartStorage();
}

// Update Cart Storage
function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Checkout Function
function checkout() {
    alert("Checkout successful!");
    cart = [];
    updateCartStorage();
}

// Initialize
if (location.pathname.includes("cart.html")) {
    renderCart();
}
