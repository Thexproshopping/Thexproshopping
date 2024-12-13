document.addEventListener('DOMContentLoaded', () => {
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const productGrid = document.querySelector('#products');
      products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.alt}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>`;
        productGrid.innerHTML += productCard;
      });
    });
});

function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
