document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const discountCodeInput = document.getElementById('discount-code');
  const applyDiscountButton = document.getElementById('apply-discount');
  const checkoutButton = document.getElementById('checkout-btn');

  let cartItems = [];
  let subtotal = 0;

  function updateCart() {
    try {
      cartItemsContainer.innerHTML = '';
      subtotal = 0;

      cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
          <p>${item.name} - $${item.price.toFixed(2)}</p>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price;
      });

      subtotalElement.textContent = subtotal.toFixed(2);
      totalElement.textContent = subtotal.toFixed(2);
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('An error occurred while updating the cart. Please try again.');
    }
  }

  function applyDiscount() {
    try {
      const discountCode = discountCodeInput.value;
      if (discountCode === 'SAVE10') {
        const discountAmount = subtotal * 0.10;
        subtotal -= discountAmount;
        alert('Discount applied!');
      } else {
        alert('Invalid discount code.');
      }
      totalElement.textContent = subtotal.toFixed(2);
    } catch (error) {
      console.error('Error applying discount:', error);
      alert('An error occurred while applying the discount. Please try again.');
    }
  }

  applyDiscountButton.addEventListener('click', applyDiscount);
  checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout...');
  });

  // Example items for demonstration
  cartItems = [
    { id: 1, name: 'Item 1', price: 29.99 },
    { id: 2, name: 'Item 2', price: 19.99 }
  ];

  updateCart();
});
