document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const discountCodeInput = document.getElementById('discount-code');
  const applyDiscountButton = document.getElementById('apply-discount');
  const checkoutButton = document.getElementById('checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
      const itemElement = `
        <div class="cart-item">
          <p>${item.name} - $${(item.price * item.quantity).toFixed(2)} (${item.quantity} pcs)</p>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>`;
      cartItemsContainer.innerHTML += itemElement;
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
    }
  });

  applyDiscountButton.addEventListener('click', () => {
    const discountCode = discountCodeInput.value.trim().toUpperCase();
    if (discountCode === 'SAVE10') {
      const discountAmount = parseFloat(subtotalElement.textContent) * 0.1;
      totalElement.textContent = (parseFloat(totalElement.textContent) - discountAmount).toFixed(2);
      alert(`Discount applied! You saved $${discountAmount.toFixed(2)}`);
    } else {
      alert('Invalid discount code.');
    }
  });

  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    window.location.href = 'thankyou.html';
  });

  updateCart();
});
