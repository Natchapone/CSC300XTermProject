"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAll);
router.get("/category/:category", productController.getAllByCategory);
router.get("/item/:id", productController.getItemDetails);
router.post("/item/:id/edit", productController.updateProduct);
router.post("/item/:id/delete", productController.deleteProduct);
router.get("/search", productController.searchByName);
//router.get("/cart", productcontroller.getCartItems); 
router.get("/inventory", productController.renderInventory);
router.post("/add", productController.addNewProduct);
router.get("/bulkUpload", productController.renderBulkUploadPage);
router.post("/bulkUpload", productController.bulkUpload);


/*function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    console.log("$$$$$" + req.session.returnTo)
    next();
  }*/

module.exports = router;