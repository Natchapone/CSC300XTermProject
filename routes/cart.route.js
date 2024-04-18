"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/", cartController.createCart);
router.post("/add/:productID", cartController.addToCart);
router.get("/cart", cartController.getCart);

module.exports = router;