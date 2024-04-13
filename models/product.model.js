"use strict";
const db = require("../models/db-conn");

function getAll() {
    let sql = "SELECT * FROM products;";
    const data = db.all(sql);
    return data;
  };

function getAllByCategory(category) {
    let sql = "SELECT * FROM products WHERE category =? ORDER BY name;";
    const data = db.all(sql, category);
    return data;
  };

function getOneById(id) {
    let sql = "SELECT * FROM products WHERE id =? ;";
    const item = db.get(sql, id);
    return item;
  };

function search(params) {
    let sql = 'SELECT * FROM products WHERE products.product_name LIKE ?;';
    let menu = db.all(sql, params);
    return menu;
  };

  module.exports = {
    getAll,
    getAllByCategory,
    getOneById,
    search,
  };
  