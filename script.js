let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}

function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (name && email && phone) {
        const cartSummary = cart
            .map(item => `${item.name} (₹${item.price} x ${item.quantity})`)
            .join(", ");
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            cart_summary: cartSummary,
            total_price: totalPrice,
        };

        emailjs
            .send("service_qo8786l", "template_546v0pe", templateParams, "6TnvROhWhdqwmbcjC")
            .then(
                () => {
                    alert("Order placed successfully and summary emailed!");
                    cart = [];
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                },
                (error) => {
                    alert("Failed to send email. Please try again.");
                    console.error("EmailJS Error:", error);
                }
            );
    } else {
        alert("Please fill out all fields!");
    }
}

if (location.pathname.includes("cart.html")) {
    renderCart();
}
