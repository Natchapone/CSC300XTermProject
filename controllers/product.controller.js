"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/product.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.render("products", { products: products, title: 'Lawn Supply' });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

async function getAllByCategory(req, res) {
  try {
    const category = req.params.category;
    const products = await model.getAllByCategory(category);
    // Pass the category as the title to the template
    res.render('productsByCategory', { title: category, products });
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getAll,
  getAllByCategory,
};

