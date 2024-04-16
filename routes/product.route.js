"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAll); // route to the all products page
router.get("/category/:category", productController.getAllByCategory); // route to the product page by category
router.get("/items/:id", productController.getOneById); // route to a specific product
//router.post("/add", productcontroller.createNew); // action to add new product in the product edit page
router.get("/search", productController.searchByName); // Route to handle product search
//router.delete("/delete/:id", productcontroller.deleteById); // action to delete a product in the product edit page
//router.put("/edit/:id", productcontroller.update); // action to edit product on the edit page
//router.get("/cart", productcontroller.getCartItems); // route to the cart page


function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    console.log("$$$$$" + req.session.returnTo)
    next();
  }

module.exports = router;