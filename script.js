let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function renderCart() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: 50px;">
                ${item.name} - ₹${item.price} x ${item.quantity}
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

function checkout() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;

    if (name && email && phone) {
        const summary = cart
            .map(item => `${item.name} (₹${item.price} x ${item.quantity})`)
            .join(", ");
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const templateParams = {
            from_name: name,
            email: email,
            phone: phone,
            summary: summary,
            total: total,
        };

        emailjs
            .send("service_qo8786l", "template_546v0pe", templateParams, "6TnvROhWhdqwmbcjC")
            .then(() => alert("Order placed successfully!"))
            .catch(err => alert("Error sending email: " + err));

        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    } else {
        alert("Please fill out all fields.");
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function scrollToSection(section) {
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", renderCart);
