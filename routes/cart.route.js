"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/", ensureAuth, cartController.createCart);
router.post("/add/:productID", ensureAuth, cartController.addToCart);
router.get("/cart", ensureAuth, cartController.getCart);
router.post("/checkout", ensureAuth, cartController.checkout);

function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    console.log("$$$$$" + req.session.returnTo)
    next();
  }

module.exports = router;