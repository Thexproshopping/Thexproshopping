/* General Styling */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    color: #333;
}

h1, h2, h3, p {
    margin: 0.5rem 0;
}

/* Header */
.header {
    background: #007bff;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(45deg, #6c757d, #007bff);
    color: white;
}

.hero h2 {
    font-size: 2.5rem;
}

.hero p {
    font-size: 1.2rem;
}

/* Search & Filter Section */
.search-filter {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
}

#search-bar {
    padding: 0.5rem;
    font-size: 1rem;
    width: 300px;
}

#filter-price {
    padding: 0.5rem;
    font-size: 1rem;
}

/* Products Section */
#products {
    padding: 2rem;
}

.product-container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.product-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
    padding: 1rem;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: scale(1.05);
}

.product-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
}

.product-card button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.3s;
}

.product-card button:hover {
    background: #0056b3;
}

/* Cart Section */
.cart {
    padding: 2rem;
}

.cart #cart-items {
    margin: 1rem 0;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #fff;
    margin-bottom: 1rem;
}

.cart-item img {
    max-width: 50px;
    border-radius: 5px;
}

.cart-summary {
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-summary button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s;
    width: 100%;
}

.cart-summary button:hover {
    background: #0056b3;
}
