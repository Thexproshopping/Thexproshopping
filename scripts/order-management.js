function validateForm(inputs) {
    for (let input of inputs) {
        if (!input.value) {
            throw new Error(`The field ${input.name} cannot be empty.`);
        }
    }
}

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
