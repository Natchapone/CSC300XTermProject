// controllers/cart.controller.js
"use strict";

const model = require("../models/cart.model");

async function addToCart(req, res) {
    try {
        const email = req.user.emails[0].value;
        const name = req.user.displayName;
    }
}
