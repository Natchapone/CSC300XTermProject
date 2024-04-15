// controllers/product.controller.js
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

async function searchByName(req, res, next) {
  try {
    const term = req.query.term;
    console.log('Search term:', term); // Log the search term
    const products = await model.search(term);
    res.render("searchResults", { products: products, title: 'Search Results' });
  } catch (err) {
    console.error("Error while searching for products: ", err);
    next(err);
  }
}

module.exports = {
  getAll,
  getAllByCategory,
  searchByName,
};
