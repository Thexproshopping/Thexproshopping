// Initialize Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Function
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // If product exists, increase quantity
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 }); // Add new product
    }

    updateCartStorage();
    alert(`${productName} added to cart!`);
}

// Render Cart Function (for cart.html)
function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = ""; // Clear current cart items

    if (!cart.length) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
        cartCount.textContent = "0";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Render each cart item
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

    cartCount.textContent = cart.length; // Update cart count
    cartTotal.textContent = total; // Update total price
}

// Change Quantity Function
function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0 or less
    }

    updateCartStorage();
}

// Remove From Cart Function
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at index
    updateCartStorage();
}

// Update Cart in Local Storage and Refresh UI
function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (location.pathname.includes("cart.html")) {
        renderCart();
    }
}

// Checkout Function
function checkout() {
    if (!cart.length) {
        alert("Your cart is empty!");
        return;
    }

    alert("Checkout successful! Thank you for your purchase.");
    cart = []; // Clear cart after checkout
    updateCartStorage();
}

// Initialize Cart on Page Load
if (location.pathname.includes("cart.html")) {
    renderCart(); // Only render cart if on cart page
}
