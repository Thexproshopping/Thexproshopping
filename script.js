let cart = [];

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    alert(`${name} added to cart!`);
}

function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
}

function checkout() {
    alert("Checkout successful!");
    cart = [];
}
