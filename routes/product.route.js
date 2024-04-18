"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");


router.get("/", ensureAuth, productController.getAll); // route to the all products page
router.get("/category/:category",ensureAuth, productController.getAllByCategory); // route to the product page by category
router.get("/items/:id", ensureAuth,productController.getOneById); // route to a specific product
router.get("/item/:id", ensureAuth,productController.getItemDetails); // Route to view item details
router.post("/item/:id/edit", ensureAuth, productController.updateProduct); // route to update product
router.post("/item/:id/delete", ensureAuth, productController.deleteProduct); //Route to delete an item
router.get("/search", ensureAuth, productController.searchByName); // Route to handle product search
//router.get("/cart", productcontroller.getCartItems); // route to the cart page
router.get("/inventory", ensureAuth, productController.renderInventory);
router.post("/add", ensureAuth, productController.addNewProduct);


function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    console.log("$$$$$" + req.session.returnTo)
    next();
  }

module.exports = router;