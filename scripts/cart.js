document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const discountCodeInput = document.getElementById('discount-code');
  const applyDiscountButton = document.getElementById('apply-discount');
  const checkoutButton = document.getElementById('checkout-btn');

  // Load initial cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let discountApplied = false;

  // Function to update cart UI
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

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Function to remove item from cart
  cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
      const itemId = parseInt(event.target.getAttribute('data-id'));
      cart = cart.filter(item => item.id !== itemId);
      updateCart();
      alert('Item removed from cart.');
    }
  });

  // Function to apply discount code
  function applyDiscount() {
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
  }

  // Checkout button event
  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    alert('Proceeding to checkout...');
    localStorage.removeItem('cart'); // Clear cart after checkout
    cart = [];
    updateCart();
  });

  // Apply discount event
  applyDiscountButton.addEventListener('click', applyDiscount);

  // Example items to simulate cart for demonstration (Remove in production)
  if (cart.length === 0) {
    cart = [
      { id: 1, name: 'Item 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Item 2', price: 19.99, quantity: 2 }
    ];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Initial cart update
  updateCart();
});
