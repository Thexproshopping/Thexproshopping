// Sample products data
const products = [
  { id: 1, name: "Product 1", price: 20.99, img: "images/product1.jpg" },
  { id: 2, name: "Product 2", price: 45.99, img: "images/product2.jpg" }
];

const productGrid = document.getElementById("product-grid");

// Load products dynamically
function loadProducts() {
  productGrid.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productElement);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex(item => item.id === productId);
  
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Product filtering
function filterProducts() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
  renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
  productGrid.innerHTML = '';
  filteredProducts.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productElement);
  });
}

window.onload = loadProducts;
