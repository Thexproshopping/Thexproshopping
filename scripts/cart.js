// Initialize EmailJS
(function() {
  emailjs.init("YOUR_USER_ID");
})();

// Render cart items
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;
  
  cartItemsContainer.innerHTML = '';
  
  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <p>${item.name}</p>
      <p>$${item.price}</p>
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
    subtotal += item.price * item.quantity;
  });

  document.getElementById('subtotal').innerText = `Subtotal: $${subtotal.toFixed(2)}`;
}

// Update cart item quantity
function updateQuantity(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove product from cart
function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCart();
}

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', function() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const userName = prompt('Enter your name:');
  const userEmail = prompt('Enter your email:');
  const cartDetails = cartItems.map(item => `${item.name} - $${item.price} x ${item.quantity}`).join('<br>');
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const emailData = {
    to_name: userName,
    to_email: userEmail,
    cart_details: cartDetails,
    subtotal: subtotal.toFixed(2)
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_USER_ID')
    .then(function(response) {
      alert('Order has been sent successfully!');
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';
    }, function(error) {
      alert('Failed to send order. Please try again.');
      console.error(error);
    });
});

window.onload = renderCart;
