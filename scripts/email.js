(function() {
    emailjs.init("6TnvROhWhdqwmbcjC");  // Replace with your actual EmailJS user ID
})();

function sendOrderConfirmation(orderData) {
    emailjs.send('service_qo8786l', 'template_109i6mr', orderData)
        .then(function(response) {
            console.log('SUCCESS!', response);
            alert('Order confirmed! A confirmation email has been sent.');
        }, function(error) {
            console.log('FAILED...', error);
            alert('There was an error sending your order confirmation. Please try again.');
        });
}
