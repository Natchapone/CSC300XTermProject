"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAll); // route to the all products page
router.get("/category/:category", productController.getAllByCategory); // route to the product page by category
router.get("/items/:id", productController.getOneById); // route to a specific product
router.get("/item/:id", productController.getItemDetails); // Route to view item details
router.post("/item/:id/edit", productController.updateProduct); // route to update product
router.post("/item/:id/delete", productController.deleteProduct); //Route to delete an item
router.get("/search", productController.searchByName); // Route to handle product search
//router.get("/cart", productcontroller.getCartItems); // route to the cart page
router.get("/inventory", productController.renderInventory);
router.post("/add", productController.addNewProduct);


/*function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    console.log("$$$$$" + req.session.returnTo)
    next();
  }*/

module.exports = router;