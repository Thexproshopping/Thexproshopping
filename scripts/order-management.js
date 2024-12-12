// Handle order processing and sending email using EmailJS
function processOrder(cartItems, userName, userEmail) {
  const orderData = {
    customerName: userName,
    email: userEmail,
    cartDetails: cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  };

  // Send email with order details
  const emailData = {
    to_name: userName,
    to_email: userEmail,
    cart_details: orderData.cartDetails.map(item => `${item.name} - $${item.price} x ${item.quantity}`).join('<br>'),
    subtotal: orderData.total.toFixed(2)
  };

  emailjs.send('service_qo8786l', 'template_93mcb61', emailData, '6TnvROhWhdqwmbcjC')
    .then(function(response) {
      console.log("Success:", response);
      window.location.href = "thankyou.html";
    }, function(error) {
      console.log("Failed:", error);
    });
}
