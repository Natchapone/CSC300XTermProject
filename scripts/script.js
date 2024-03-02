// Function to get the preset products from a category and put the product selection from drop down into the category within the form.
function cat() {
    // Get the selected category from the dropdown
    const dropdown = document.getElementById("options");
    const selected = dropdown.options[dropdown.selectedIndex].text;

    const category = document.getElementById("category");
    category.innerText = selected;
    category.contentEditable = false;

    // Clear the list of products
    document.getElementById('listP').innerHTML = "";

    // Call productList with the selected categories
    const products = productList(selected);

    // Loop through the products and add them to the list
    products.forEach(function (product) {
        const list = document.createElement('li');
        list.innerHTML = 'Product ID: '
            + product.ID + "<br>Name: "
            + product.name + "<br>Description: "
            + product.Description + "<br>Category: "
            + product.Category + "<br>Image Path: <span class='imgPath' contenteditable='true'>" + product.imagepath + "</span><br>Price: $"
            + product.imagepath + "<br>Price: $"
            + product.price + "<br><br>" + '<button class="edit-btn">Edit</button>'
            + '<button class="save-btn" style="display:none;">Save Changes</button>';
        if (product.imagepath) {
            const img = document.createElement('img');
            img.src = product.imagepath;
            img.alt = "Product Image";
            img.style.maxWidth = "100px";
            list.appendChild(img);
        }
        // Add the product to the list.
        document.getElementById('listP').appendChild(list);
    });

    // Add event listeners for edit and save buttons
    addEditEventListeners();
}

function addEditEventListeners() {
    // Add event listeners for edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const listItem = this.parentNode;
            const content = listItem.innerHTML;
            listItem.setAttribute('contenteditable', 'true');
            listItem.querySelector('.edit-btn').style.display = 'none';
            listItem.querySelector('.save-btn').style.display = 'inline';
        });
    });
    // Add event listeners for save buttons
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const listItem = this.parentNode;
            listItem.removeAttribute('contenteditable');
            listItem.querySelector('.edit-btn').style.display = 'inline';
            listItem.querySelector('.save-btn').style.display = 'none';

            // Update image source
            const imagePath = listItem.querySelector('.imgPath').innerText;
            const img = listItem.querySelector('img');
            if (img) {
                img.src = imagePath;
            }
        });
    });
}

//Begin new product IDs at 3 since each category has 2 products already.
var productID = 3;

// Get the list of products for a specific category
function productList(category) {
    var proList = [];
    if (category === 'Machinery') {
        proList = [
            { ID: '1', name: 'John Deere S100 Gas Mower', Description: 'This is a gas mower', Category: 'Machinery', imagepath: 'images/JohnDeere.webp', price: '2,399' },
            { ID: '2', name: 'Seeder Machine', Description: 'This is a seed disperser', Category: 'Machinery', imagepath: 'images/SeedM.jpg', price: '1,537' }
        ];
    } else if (category === 'Lawn Supplements') {
        proList = [
            { ID: '1', name: 'Miracle-Gro Plant Food', Description: 'This is a fertilizer', Category: 'Lawn Supplements', imagepath: 'images/miraclegro.webp', price: '27.97' },
            { ID: '2', name: 'Absolute Black Mulch', Description: 'This is mulch', Category: 'Lawn Supplements', imagepath: 'images/blackmulch.jpg', price: '3.99' }
        ];
    } else if (category === 'Lawn Tools') {
        proList = [
            { ID: '1', name: 'Forged Hand Trowel', Description: 'This is a trowel', Category: 'Lawn Tools', imagepath: 'images/trowel.jpeg', price: '30' },
            { ID: '2', name: 'Watering Can', Description: 'This is a watering can', Category: 'Lawn Tools', imagepath: 'images/wateringc.jpeg', price: '16.99' }
        ];
    }
    return proList;
}

//Add Product function for new items from the Add Product form.
function addProduct(e) {
    // Prevent the form from submitting an empty form.
    e.preventDefault();
    // Get the values from the form.
    const productN = document.getElementById('productName').value;
    const productD = document.getElementById('description').value;
    const productC = document.getElementById('category').innerText;
    const productI = document.getElementById('imageP').value;
    const productP = document.getElementById('price').value;
    // Create a new product object.
    const list = document.createElement('li');
    list.innerHTML = 'Product ID: ' 
    + productID + "<br>Name: " 
    + productN + "<br>Description: " 
    + productD + "<br>Category: " 
    + productC + "<br>Image Path: <span class='imgPath' contenteditable='true'>" + productI + "</span><br>Price: $" 
    + productI + "<br>Price: $" 
    + productP + "<br><br>" + '<button class="edit-btn">Edit</button>' 
    + '<button class="save-btn" style="display:none;">Save Changes</button>';
    //If an image path was entered, add an image to the product.
    if (productI) {
        const img = document.createElement('img');
        img.src = productI;
        img.alt = "Product Image";
        img.style.maxWidth = "100px";
        list.appendChild(img);
    }
    // Add the product to the list.
    document.getElementById('listP').appendChild(list);
    // Increment the product ID.
    productID++;
    // Clear the form.
    document.getElementById('productName').value = "";
    document.getElementById('description').value = "";
    document.getElementById('category').innerText = "";
    document.getElementById('imageP').value = "";
    document.getElementById('price').value = "";
    // Add event listeners for edit and save buttons
    addEditEventListeners();
};

// Function to load the page with the addProduct and Category functions already loaded.
window.onload = function () {
    document.getElementById('proForm').addEventListener('submit', addProduct);
    cat();
};