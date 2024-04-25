// controllers/cart.controller.js
"use strict";

const model = require("../models/cart.model");
const db = require("../models/db-conn");
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
    var productID = req.body.product_id;
    var quantity = req.body.quantity;
    var email = req.user.emails[0].value;

    const userCartQuery = "SELECT c.cartID FROM users u INNER JOIN carts c ON u.userID = c.userID WHERE u.email = ?";
    const userCart = await db.get(userCartQuery, email);
    if (!userCart) {
        console.error("No cart found for user:", email);
        return res.status(404).json({ success: false, error: "User does not have a cart." });
    }
    const cartID = userCart.cartID;
    console.log("Received request to add product:", productID, "with quantity:", quantity, "to cart:", cartID);
    await model.addToCart(cartID, productID, quantity); // Pass cartID instead of userID
    res.status(201).json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function getCart(req, res) {
    try {
        var email = req.user.emails[0].value;
        const userCartQuery = "SELECT c.cartID FROM users u INNER JOIN carts c ON u.userID = c.userID WHERE u.email = ?";
         const userCart = await db.get(userCartQuery, email);
    if (!userCart) {
        console.error("No cart found for user:", email);
        return res.status(404).json({ success: false, error: "User does not have a cart." });
    }
        const cartID = userCart.cartID;
        const cartProducts = await model.getCartProducts(cartID);

        const totals = await calculateCartTotals(cartID);

        res.render("cart", { 
            cartItems: cartProducts,
            subtotal: totals.subtotal,
            tax: totals.tax,
            deliveryFee: totals.deliveryFee,
            total: totals.total,
            title: 'Your Cart'});
     } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function checkout(req, res) {
    try {
        var email = req.user.emails[0].value;
        const userCartQuery = "SELECT c.cartID FROM users u INNER JOIN carts c ON u.userID = c.userID WHERE u.email = ?";
         const userCart = await db.get(userCartQuery, email);
    if (!userCart) {
        console.error("No cart found for user:", email);
        return res.status(404).json({ success: false, error: "User does not have a cart." });
    }
        const cartID = userCart.cartID;
        await model.clearCart(cartID);
        res.redirect("/cart/cart");
} catch (error) {
    console.error("Error clearing cart:", error);
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

async function deleteFromCart(req, res) {
    try {
        var email = req.user.emails[0].value;
        const userCartQuery = "SELECT c.cartID FROM users u INNER JOIN carts c ON u.userID = c.userID WHERE u.email = ?";
         const userCart = await db.get(userCartQuery, email);
    if (!userCart) {
        console.error("No cart found for user:", email);
        return res.status(404).json({ success: false, error: "User does not have a cart." });
    }
        const cartID = userCart.cartID;
        var productID = req.params.productID;
        await model.deleteFromCart(cartID, productID);
        res.redirect("/cart/cart");
} catch (error) {
    console.error("Error deleting from cart:", error);
   res.status(500).json({ success: false, error: "Internal Server Error" });
}
}

module.exports = {
    createCart,
    addToCart,
    getCart,
    checkout,
    deleteFromCart,
};
