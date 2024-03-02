function cat() {
    const dropdown = document.getElementById("options");
    const selected = dropdown.options[dropdown.selectedIndex].text;

    const category = document.getElementById("category");
    category.innerText = selected;
    category.contentEditable = false;
    document.getElementById('productID').value = productID;
}

var productID = 1;

function productList (category) {
    var proList = [];
    if (category === 'Machinery') {
        proList = [
            {ID: '1', name: 'John Deere S100 Gas Mower', Description: 'This is a gas mower', Category: 'Machinery', imagepath: '/CSC300XTermProject/images/JohnDeere.webp', price: '2,399'},
            {ID: '2', name: 'Seeder Machine', Description: 'This is a seed disperser', Category: 'Machinery', imagepath: '/CSC300XTermProject/images/SeedM.jpp', price: '1,537'}
        ];
    } else if (category === 'Lawn Supplements') {
        proList = [
            {ID: '1', name: 'Miracle-Gro Plant Food', Description: 'This is a fertilizer', Category: 'Lawn Supplements', imagepath: '/CSC300XTermProject/images/miraclegro.webp', price: '27.97'},
            {ID: '2', name: 'Absolute Black Mulch', Description: 'This is mulch', Category: 'Lawn Supplements', imagepath: '/CSC300XTermProject/images/blackmulch.jpg', price: '3.99'}
        ];
    } else if (category === 'Lawn Tools') {
        proList = [
            {ID: '1', name: 'Forged Hand Trowel', Description: 'This is a trowel', Category: 'Lawn Tools', imagepath: '/CSC300XTermProject/images/trowel.jpeg', price: '30'},
            {ID: '2', name: 'Watering Can', Description: 'This is a watering can', Category: 'Lawn Tools', imagepath: '/CSC300XTermProject/images/wateringc.jpeg', price: '16.99'}
        ];
}
    return proList;
}

function addProduct(e) {
    e.preventDefault();

    var productN = document.getElementById('productName').value;
    var productD = document.getElementById('description').value;
    var productC = document.getElementById('category').innerText;
    var productI = document.getElementById('imageP').value;
    var productP = document.getElementById('price').value;

    var list = document.createElement('li');
    list.innerHTML = 'Product ID: ' + productID + "<br>Name: "
        + productN + "<br>Description: " + productD + "<br>Category: "
        + productC + "<br>Image Path: " + productI + "<br>Price: $"
        + productP + "<br><br>" + '<button class="edit-btn">Edit</button>' +
        '<button class="save-btn" style="display:none;">Save Changes</button>';

    if (productI) {
        var img = document.createElement('img');
        img.src = productI;
        img.alt = "Product Image";
        img.style.maxWidth = "100px"; 
        list.appendChild(img); 
    }


    document.getElementById('listP').appendChild(list);
    productID++;

    document.getElementById('productName').value = "";
    document.getElementById('description').value = "";
    document.getElementById('category').innerText = "";
    document.getElementById('imageP').value = "";
    document.getElementById('price').value = "";

    var editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var listItem = this.parentNode;
            var content = listItem.innerHTML;
            listItem.setAttribute('contenteditable', 'true');
            listItem.querySelector('.edit-btn').style.display = 'none';
            listItem.querySelector('.save-btn').style.display = 'inline';
        });
    });

    var saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var listItem = this.parentNode;
            listItem.removeAttribute('contenteditable');
            listItem.querySelector('.edit-btn').style.display = 'inline';
            listItem.querySelector('.save-btn').style.display = 'none';
        });
    });
};

window.onload = function () {
    document.getElementById('proForm').addEventListener('submit', addProduct);
    cat();
};