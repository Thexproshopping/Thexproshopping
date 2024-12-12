// Manage order processing
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

  // Save order to orders.json (for demonstration in a static site)
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Send order details via EmailJS
  const emailData = {
    to_name: userName,
    to_email: userEmail,
    cart_details: orderData.cartDetails.map(item => `${item.name} - $${item.price} x ${item.quantity}`).join('<br>'),
    subtotal: orderData.total.toFixed(2)
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_USER_ID')
    .then(function(response) {
      console.log("Success:", response);
      window.location.href = "thankyou.html";
    }, function(error) {
      console.log("Failed:", error);
    });
}
