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

document.getElementById("addToCartF").addEventListener("submit", function(e) {
    e.preventDefault();
    var productID = document.getElementById("product_id").value;
    var quantity = document.getElementById("quantity").value;
    var cartID = document.getElementById("cart_id").value;

    fetch(`/cart/add/${productID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart_id: cartID,
            product_id: productID,
            quantity: quantity
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(data => {
        console.log(data); // Handle success response from server
    })
    .catch(error => {
        console.error("Error:", error); // Handle error
    });
});

function updateQuantity(productID, quantity) {
    fetch(`/cart/update/${productID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('totalAmount').innerText = data.total;
    })
    .catch(error => console.error('Error updating cart quantity:', error));
}
