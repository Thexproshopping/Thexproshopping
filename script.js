let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} (x${item.quantity})</p>
                <div>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    // Add your EmailJS checkout logic here
}
