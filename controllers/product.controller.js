"use strict";

const model = require("../models/product.model");
const multer = require("multer");
const fs = require("fs");
const db = require("../models/db-conn");
const upload = multer({ dest: "uploads/" });

async function getAll(req, res, next) {
  try {
    const products = await model.getAll();
    res.render("products", { products: products, title: 'Lawn Supply' });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

async function getAllByCategory(req, res) {
  try {
    const category = req.params.category;
    const products = await model.getAllByCategory(category);
    res.render('productsByCategory', { title: category, products });
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).send('Internal Server Error');
  }
}

function getOneById(req, res, next) {
  let id = req.params.id;
  try {
    let product = model.getOneById(id);
    res.render("details", { product: product, title: 'Product #' + id });
  } catch (err) {
    console.error("Error while getting product details: ", err.message);
    next(err);
  }
}
async function searchByName(req, res, next) {
  try {
    let products = [];
    const term = req.query.term;
    let searchTerm = '%' + term + '%';
    console.log('Search term:', term);
    products = await model.search(searchTerm);
    res.render("searchResults", { products: products, title: 'Search Results' });
  } catch (err) {
    console.error("Error while searching for products: ", err);
    next(err);
  }
}

async function renderInventory(req, res, next) {
  try {
    const products = await model.getAll();
    res.render('inventory', { products, title: 'Inventory' });
  } catch (error) {
    console.error('Error fetching products for inventory:', error);
    next(error);
  }
}

async function addNewProduct(req, res, next) {
  try {
    const { id, name, category, price, imgpath, description } = req.body;
    await model.addNewProduct(id, name, category, price, imgpath, description);
    res.redirect('/products/inventory');
  } catch (error) {
    console.error('Error adding new product:', error);
    next(error);
  }
}

function getItemDetails(req, res) {
  let id = req.params.id;
  try {
    let product = model.getOneById(id);
    console.log("Retrieved Product:", product);
    res.render("item-details", { product: product });
  } catch (err) {
    console.error("Error while getting product details: ", err.message);
    next(err);
  }
}

async function updateProduct(req, res, next) {
  let id = parseInt(req.params.id);
  let name = req.body.productName;
  let description = req.body.productDescription;
  let category = req.body.productCategory;
  let price = parseFloat(req.body.productPrice);
  let imagePath = req.body.productImage;

  if (id && name && description && category && price && imagePath) {
    try {
      await model.updateProduct(id, name, description, category, imagePath, price);
      res.redirect(`/products/item/${id}`);
    } catch (err) {
      console.error("Error updating product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Missing or invalid parameters for product update.");
  }
}

async function deleteProduct(req, res, next) {
  const productId = req.params.id;
  try {
    await model.deleteProduct(productId);
    res.redirect("/products/inventory");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Internal Server Error");
  }
}

function renderBulkUploadPage(req, res) {
  res.render("bulkUpload", { title: "Bulk Upload" });
}

async function bulkUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = req.file.path;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading file.");
      }

      try {
        const jsonData = JSON.parse(data);

        if (!jsonData.products || !Array.isArray(jsonData.products)) {
          return res.status(400).send("Invalid JSON format.");
        }

        console.log('JSON data:', jsonData);

        const insertStmt = db.prepare("INSERT INTO products (product_name, description, imagepath, price, catID) VALUES (?, ?, ?, ?, ?)");

        for (const product of jsonData.products) {
          await insertStmt.run(product.product_name, product.description, product.imagepath, product.price, product.catID);
        }

        fs.unlinkSync(filePath);

        res.redirect("/products/inventory");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error during bulk upload:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAll,
  getAllByCategory,
  getOneById,
  searchByName,
  renderInventory,
  addNewProduct,
  getItemDetails,
  updateProduct,
  deleteProduct,
  renderBulkUploadPage,
  bulkUpload,
};
