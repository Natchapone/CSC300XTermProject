"use strict";
const db = require("../models/db-conn");

async function createCart(userID) {
    try {
        let sql = "INSERT INTO carts (status, created, userID) VALUES (?,?,?);";
    let status = "active";
    let created = new Date().toLocaleDateString('en-US');
    const params = [status, created, userID];
    await db.run(sql, params);

    console.log("Cart created for user with ID:", userID);
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }

}

async function addToCart(cartID, productID, quantity) {
   try {
    let sql = "INSERT INTO cartProducts (cartID, productID, quantity) VALUES (?,?,?);";
        const params = [cartID, productID, quantity];
        await db.run(sql, params);
   } catch (error) {
    console.error("Error adding to cart:", error);
       throw error;
}
}

async function clearCart(cartID) {
    try {
        let sql = "DELETE FROM cartProducts WHERE cartID = ?";
        await db.run(sql, cartID);
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
}

function getCartProducts(cartID) {
    try {
    let sql = "SELECT cp.*, p.product_name, p.description, p.imagepath, p.price FROM cartProducts cp  INNER JOIN products p ON cp.productID = p.productID INNER JOIN carts c ON cp.cartID = c.cartID  WHERE cp.cartID = ?;";
    return db.all(sql, cartID);
    } catch (error) {
        console.error("Error fetching cart products:", error);
        throw error;
    }
}

async function deleteFromCart(cartID, productID) {
    try {
    let sql = 'DELETE FROM cartProducts WHERE cartID =? AND productID =?';
    const params = [cartID, productID];
    await db.run(sql, params);
    } catch (error) {
        console.error("Error deleting from cart:", error);
        throw error;
    }
}

async function updateQuantity(cartID, productID, quantity) {
    try {
        const sql = "UPDATE cartProducts SET quantity = ? WHERE cartID = ? AND productID = ?";
        const params = [quantity, cartID, productID];
        await db.run(sql, params);
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        throw error;
    }
}


module.exports = {
    createCart,
    addToCart,
    getCartProducts,
    clearCart,
    deleteFromCart,
    updateQuantity,
};