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

async function addToCart(userID, productID, quantity) {
    return new Promise((resolve, reject) => {
    const sql = "INSERT INTO cartProducts (userID, productID, quantity) VALUES (?, ?, ?);";
    const params = [userID, productID, quantity];
    db.run(sql, params, function(err) {
        if (err) {
            reject(err);
        } else {
            resolve(this.lastID);
        }
    });
});
}

function getCartProducts(cartID) {
    let sql = "SELECT cp.*, p.product_name, p.description, p.imagepath, p.price FROM cartProducts cp  INNER JOIN products p ON cp.productID = p.productID INNER JOIN carts c ON cp.cartID = c.cartID  WHERE cp.cartID = ?;";
    return db.all(sql, cartID);
}


module.exports = {
    createCart,
    addToCart,
    getCartProducts,
};