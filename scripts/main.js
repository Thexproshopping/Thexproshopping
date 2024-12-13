document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productsContainer = document.getElementById('products');

  // Fetch products from JSON file
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.alt}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>`;
        productsContainer.innerHTML += productCard;
      });
    })
    .catch(error => console.error('Error loading products:', error));

  // Add product to cart
  window.addToCart = function (productId) {
    fetch('data/products.json')
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id === productId);
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
      });
  };
});
