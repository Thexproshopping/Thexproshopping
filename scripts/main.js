document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 29.99, image: 'public/images/product1.jpg' },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'public/images/product2.jpg' },
    { id: 3, name: 'Men\'s T-Shirt', price: 19.99, image: 'public/images/product3.jpg' },
    { id: 4, name: 'Women\'s Jacket', price: 49.99, image: 'public/images/product4.jpg' },
  ];

  const productsContainer = document.getElementById('products');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    `;
    productsContainer.appendChild(productCard);
  });

  // Handle Add to Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === productId);

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    });
  });
});
