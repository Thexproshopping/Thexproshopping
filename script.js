let cart = []; // Stores cart items

// Function to display cart
function updateCart() {
    const cartContainer = document.querySelector('.cart-container');
    const cartCount = document.querySelector('#cart-count');
    const totalPrice = document.querySelector('#total-price');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        cartCount.textContent = '0';
        totalPrice.textContent = '₹0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <div class="cart-actions">
                    <button class="increase-btn" onclick="increaseQuantity(${index})">+</button>
                    <button class="decrease-btn" onclick="decreaseQuantity(${index})">-</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = `₹${total}`;
}

// Function to add product to cart
function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCart();
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }
    updateCart();
}

// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Initialize empty cart
updateCart();
