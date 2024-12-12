// Load products from the JSON file
fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card', 'fade-in');
      productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(productCard);
    });
  });

// Add product to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      cart.push({...product, quantity: 1});
      localStorage.setItem('cart', JSON.stringify(cart));
    });
}
