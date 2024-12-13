document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountButton = document.getElementById('apply-discount');
    const checkoutButton = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discountApplied = false;

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            subtotalElement.textContent = '0.00';
            totalElement.textContent = '0.00';
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.name} - $${(item.price * item.quantity).toFixed(2)} (${item.quantity} pcs)</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
            alert('Item removed from cart.');
        }
    });

    applyDiscountButton.addEventListener('click', () => {
        if (discountApplied) {
            alert('Discount already applied.');
            return;
        }

        const discountCode = discountCodeInput.value.trim().toUpperCase();
        const subtotal = parseFloat(subtotalElement.textContent);

        if (discountCode === 'SAVE10') {
            const discountAmount = subtotal * 0.10;
            const newTotal = subtotal - discountAmount;
            totalElement.textContent = newTotal.toFixed(2);
            discountApplied = true;
            alert(`Discount applied! You saved $${discountAmount.toFixed(2)}.`);
        } else {
            alert('Invalid discount code.');
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const orderSummary = cart.map(item => `${item.name} (${item.quantity} pcs): $${(item.price * item.quantity).toFixed(2)}`).join('\n');
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderData = {
            customer_name: 'John Doe',  // Replace with actual customer input
            email: 'customer@example.com', // Replace with actual customer input
            order_summary: orderSummary,
            total: `$${totalAmount.toFixed(2)}`
        };

        sendOrderConfirmation(orderData);
        localStorage.removeItem('cart');
        window.location.href = 'thankyou.html';
    });

    updateCart();
});
