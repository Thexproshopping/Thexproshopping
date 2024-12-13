document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products');

  // Fetch and display products from the products.json file
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.alt}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error loading products:', error));

  // Add product to cart
  window.addToCart = function(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = getProductById(productId);

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
  };

  // Get product details by ID
  function getProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === id);
  }
});
