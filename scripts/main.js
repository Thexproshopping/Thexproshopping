function renderProducts(products) {
  productGrid.innerHTML = '';

  products.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart 🛒</button>
      </div>`;
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  
  const existingProductIndex = cart.findIndex(p => p.id === product.id);
  if (existingProductIndex > -1) {
    // If it exists, increase the quantity or show an alert
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ id, name: product.name, price: product.price, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <p>${item.name} - $${(item.price * item.quantity).toFixed(2)}</p>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
}
