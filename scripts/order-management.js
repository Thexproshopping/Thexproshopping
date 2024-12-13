// Send Order Confirmation Email with EmailJS
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
