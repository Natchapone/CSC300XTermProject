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

async function getOneById(req, res) {
  try {
    const Id = req.params.Id;
    const products = await model.getOneById(Id);
    res.render('details'), {}
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getAll,
  getAllByCategory,
  getOneById,
};
