"use strict";
const db = require("../models/db-conn");

function getAll() {
  let sql = "SELECT products.*, categories.cat_name FROM products JOIN categories ON products.catID = categories.catID;";
  const data = db.all(sql);
  return data;
}

function getAllByCategory(category) {
  let sql = "SELECT products.*, categories.cat_name FROM products JOIN categories ON products.catID = categories.catID WHERE categories.cat_name = ? ORDER BY products.product_name;";
  return db.all(sql, category);
}

function getOneById(id) {
  let sql = "SELECT * FROM products WHERE productID = ? ;";
  const item = db.get(sql, id);
  return item;
}

function search(params) {
  let sql = 'SELECT * FROM products WHERE product_name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function addNewProduct(id, name, category, price, imgpath, description) {
  let sql = "INSERT INTO products (product_name, description, imagepath, price, catID) VALUES (?, ?, ?, ?, (SELECT catID FROM categories WHERE cat_name = ?))";
  db.run(sql, name, description, imgpath, price, category);
}


module.exports = {
  getAll,
  getAllByCategory,
  getOneById,
  search,
  addNewProduct,
};
