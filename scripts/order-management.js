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
    const response = await emailjs.send("service_qo8786l", "template_109i6mr", orderData);
    if (response.status !== 200) {
      throw new Error("Failed to send email.");
    }
  } catch (error) {
    console.error("EmailJS Error: ", error);
    alert("There was an error sending your order confirmation. Please try again.");
  }
}

// Checkout form submission handling
document.getElementById("checkoutForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formInputs = event.target.elements;

  try {
    validateForm(formInputs);

    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const orderData = {
      customer_name: formInputs.name.value,
      email: formInputs.email.value,
      order_summary: cartData.map(item => `${item.name} (${item.quantity} pcs): $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
      total: cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
      address: formInputs.address.value,
      phone: formInputs.phone.value
    };

    // Send order confirmation email
    await sendOrderConfirmation(orderData);

    // Clear cart after checkout
    localStorage.removeItem('cart');
    alert("Order placed successfully!");
    window.location.href = "thankyou.html";
  } catch (error) {
    console.error("Checkout Error: ", error);
    alert(error.message);
  }
});
