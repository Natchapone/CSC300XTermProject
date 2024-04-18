document.querySelector('.searchbar').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = encodeURIComponent(document.querySelector('input[name="term"]').value); // Encode the search term
    const response = await fetch(`/products/search?q=${query}`);
    const data = await response.json();
});

function confirmAdmin() {
    document.getElementById('conWindow').style.display = 'block';
}

function closeConfirm() {
    document.getElementById('conWindow').style.display = 'none';
}

function checkPassword() {
    var password = document.getElementById('password').value;
    const correctPassword = "pass";

    if (password === correctPassword) {
        window.location.href = "/products/inventory";
    } else {
        document.getElementById('error-message').innerText = "Incorrect password.";
    }
}

function pressEnter(event) {
    if (event.keyCode === 13) {
        checkPassword();
    }
}

function addToCart(productId) {
    fetch(`/cart/add/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: 1 }) 
    })
    .then(response => {
        if (response.ok) {
           
            console.log('Product added to cart successfully');
        } else {
           
            console.error('Failed to add product to cart');
        }
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
    });
}