let cart = []; // Stores cart items

function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    const cartCount = document.querySelector('#cart-count');
    const totalPrice = document.querySelector('#total-price');
    cartContainer.innerHTML = '';

    if (!cart.length) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        cartCount.textContent = '0';
        totalPrice.textContent = '₹0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} (₹${item.price} x ${item.quantity})</p>
                <div>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                </div>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = `₹${total}`;
}

function checkout() {
    alert('Checkout complete!');
    cart = [];
    saveCart();
}

if (location.pathname.includes('cart.html')) {
    cart = JSON.parse(localStorage.getItem("cart") || '[]');
    renderCart();
}
