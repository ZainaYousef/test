async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost/inventory-management/backend/api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('inventory').style.display = 'block';
        fetchInventory();
    } else {
        alert('Login failed');
    }
}

async function fetchInventory() {
    const response = await fetch('http://localhost/inventory-management/backend/api/inventory.php');
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerText = `${product.name}: ${product.quantity}`;
        productList.appendChild(productItem);
    });
}
