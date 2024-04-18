"use strict";
const db = require("../models/db-conn");
const fs = require("fs");

function getAll() {
  let sql = "SELECT products.*, categories.cat_name FROM products JOIN categories ON products.catID = categories.catID;";
  const data = db.all(sql);
  return data;
};

function getAllByCategory(category) {
  let sql = "SELECT products.*, categories.cat_name FROM products JOIN categories ON products.catID = categories.catID WHERE categories.cat_name = ? ORDER BY products.product_name;";
  return db.all(sql, category);
};

function getOneById(id) {
  let sql = "SELECT products.*, categories.cat_name FROM products JOIN categories ON products.catID = categories.catID WHERE productID = ?;";
  const item = db.get(sql, id);
  return item;
};

function search(params) {
  let sql = 'SELECT * FROM products WHERE product_name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function addNewProduct(id, name, category, price, imgpath, description) {
  let sql = "INSERT INTO products (product_name, description, imagepath, price, catID) VALUES (?, ?, ?, ?, (SELECT catID FROM categories WHERE cat_name = ?))";
  db.run(sql, name, description, imgpath, price, category);
};

function updateProduct(id, name, description, category, imgpath, price) {
  let sql = "UPDATE products SET product_name = ?, description = ?, catID = (SELECT catID FROM categories WHERE cat_name = ?), imagepath = ?, price = ? WHERE productID = ?";
  return db.run(sql, name, description, category, imgpath, price, id);
};

function deleteProduct(productId) {
  return db.run("DELETE FROM products WHERE productID = ?", productId);
}

async function bulkUpload(products) {
  try {
    const insertStmt = db.prepare("INSERT INTO products (productID, product_name, description, imagepath, price, catID) VALUES (?, ?, ?, ?, ?, ?)");

    for (const product of products) {
      await insertStmt.run(product.productID, product.product_name, product.description, product.imagepath, product.price, product.catID);
    }

    return "Bulk upload successful!";
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  getAllByCategory,
  getOneById,
  search,
  addNewProduct,
  updateProduct,
  deleteProduct,
  bulkUpload,
};
