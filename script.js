let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px;">
            <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

function updateQuantity(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(i => i.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    if (!name || !email || !phone) return alert('All fields are required.');

    const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        cart_items: cart.map(item => `${item.name} (₹${item.price} x ${item.quantity})`).join(', '),
        total: document.getElementById('cart-total').textContent
    };

    emailjs.send('service_qo8786l', 'template_546v0pe', templateParams, '6TnvROhWhdqwmbcjC')
        .then(() => alert('Order placed!'))
        .catch(err => alert('Error placing order: ' + err));
}

if (location.pathname.includes('cart.html')) renderCart();
