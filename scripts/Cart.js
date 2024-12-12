document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const discountInput = document.getElementById("discount-code");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
      subtotal += item.price;
      cartItems.innerHTML += `
        <div class="cart-item">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
        </div>`;
    });

    subtotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = subtotal.toFixed(2);
  }

  document.getElementById("apply-discount").addEventListener("click", () => {
    const discountCode = discountInput.value.trim();
    if (discountCode === "DISCOUNT10") {
      const subtotal = parseFloat(subtotalEl.textContent);
      const discount = subtotal * 0.1;
      totalEl.textContent = (subtotal - discount).toFixed(2);
      alert("Discount applied successfully!");
    } else {
      alert("Invalid discount code.");
    }
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Order placed successfully!");
    localStorage.clear();
    window.location.href = "thankyou.html";
  });

  renderCart();
});
