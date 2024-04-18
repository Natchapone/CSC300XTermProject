// controllers/cart.controller.js
"use strict";

const model = require("../models/cart.model");

async function createCart(userID) {
    try {
        await model.createCart(userID);
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}

async function addToCart(req, res) {
    try {
        const { productID } = req.params;
        const { quantity } = req.body;
        const userID = 18;
        await model.addToCart(userID, productID, quantity);
        res.status(201).json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function getCart(req, res) {
    try {
        const cartID = req.params.cartID;
        const cartProducts = await model.getCartProducts(cartID);

        const totals = await calculateCartTotals(cartID);
        res.render("cart", { cartItems: cartProducts, ...totals, title: "Cart" });
     } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function calculateCartTotals(cartID) {
    const cartProducts = await model.getCartProducts(cartID);

    let subtotal = 0;
    cartProducts.forEach((product) => {
        subtotal += product.price * product.quantity;
    });

    const tax = 0.0675;
    const NCTax = subtotal * tax;
    

    const deliveryFee = 15;
    const total = subtotal + NCTax + deliveryFee;

    return {subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), deliveryFee: deliveryFee.toFixed(2), total: total.toFixed(2)}
}

module.exports = {
    createCart,
    addToCart,
    getCart,
};
