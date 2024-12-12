// Load cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Display cart items
cartItems.forEach(item => {
  const itemElement = document.createElement('div');
  itemElement.classList.add('cart-item');
  itemElement.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <div>${item.name}</div>
    <div>$${item.price} x ${item.quantity}</div>
  `;
  cartContainer.appendChild(itemElement);
});

// Calculate total price
const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
totalPriceElement.textContent = totalPrice.toFixed(2);

// Handle checkout
document.getElementById('checkoutBtn').addEventListener('click', function() {
  const userName = prompt('Enter your name:');
  const userEmail = prompt('Enter your email:');
  processOrder(cartItems, userName, userEmail);
});
