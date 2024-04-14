"use strict";
const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/products", productController.getAll); // route to the all products page
router.get("/category/:category", productController.getAllByCategory); // route to the product page by category
//router.get("/item/:id", productcontroller.getOneById); // route to a specific product
//router.post("/add", productcontroller.createNew); // action to add new product in the product edit page
//router.get("/search", productcontroller.searchByName); // 
//router.delete("/delete/:id", productcontroller.deleteById); // action to delete a product in the product edit page
//router.put("/edit/:id", productcontroller.update); // action to edit product on the edit page
//router.get("/cart", productcontroller.getCartItems); // route to the cart page

module.exports = router;