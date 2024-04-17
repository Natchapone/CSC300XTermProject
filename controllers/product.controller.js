"use strict";

const model = require("../models/product.model");

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
};
