let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Render Cart
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - ₹${item.price}</p>
            </div>`;
        total += item.price;
    });

    totalContainer.textContent = total;
}

// Checkout
function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (name && email && phone) {
        alert(`Thank you, ${name}! Your order has been placed.`);
        localStorage.clear();
        location.reload();
    } else {
        alert("Please fill all the details.");
    }
}

// Scroll to Section
function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Render Cart Page
if (location.pathname.includes("cart.html")) {
    renderCart();
}
