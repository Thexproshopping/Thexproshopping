document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const search = document.getElementById("search");

  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      renderProducts(products);

      search.addEventListener("input", () => {
        const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(search.value.toLowerCase())
        );
        renderProducts(filteredProducts);
      });
    });

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

  window.addToCart = function (id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };
});
