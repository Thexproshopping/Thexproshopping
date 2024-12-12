// Function to validate checkout form inputs
function validateForm(inputs) {
    for (let input of inputs) {
        if (!input.value) {
            throw new Error(`The field ${input.name} cannot be empty.`);
        }
    }
}

// Function to send order confirmation email
async function sendOrderConfirmation(orderData) {
    try {
        const response = await emailjs.send("service_qo8786l", "template_l40kgld", orderData);
        if (response.status !== 200) {
            throw new Error("Failed to send email.");
        }
    } catch (error) {
        console.error("EmailJS Error: ", error);
        alert("There was an error sending your order confirmation. Please try again.");
    }
}

// Function to retrieve cart data from localStorage
function getCartData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));
}

// Function to calculate total order cost
function calculateTotal(cartData) {
    let total = 0;
    cartData.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

// Function to save order data to orders.json
async function saveOrderData(orderData) {
    try {
        const response = await fetch('data/orders.json');
        const orders = await response.json();
        orders.push(orderData);
        await fetch('data/orders.json', {
            method: 'POST',
            body: JSON.stringify(orders),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error saving order data: ", error);
    }
}

// Function to handle checkout process
async function checkout(event) {
    event.preventDefault();
    const formInputs = event.target.elements;

    try {
        validateForm(formInputs);

        const cartData = getCartData(); // Retrieve cart data
        const orderData = {
            customer_name: formInputs.name.value,
            email: formInputs.email.value,
            order_summary: cartData,
            total: calculateTotal(cartData), // Calculate the total price
            address: formInputs.address.value,
            phone: formInputs.phone.value
        };

        // Save order data locally (in orders.json)
        await saveOrderData(orderData);

        // Send confirmation email to the admin
        await sendOrderConfirmation(orderData);

        // Clear cart after checkout
        localStorage.removeItem('cart');
        
        // Redirect to thank you page
        window.location.href = "thankyou.html"; 
    } catch (error) {
        console.error("Checkout Error: ", error);
        alert(error.message);
    }
}

// Event listener for checkout form submission
document.getElementById("checkoutForm").addEventListener("submit", checkout);
