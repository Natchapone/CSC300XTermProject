"use strict";
const db = require("../models/db-conn");

function createCart(userID) {
    let sql = "INSERT INTO carts (status, created, userID) VALUES (?,?,?);";
    let status = "active";
    let created = new Date().toLocaleDateString('en-US');
    const params = [status, created, userID];
    const cart = db.run(sql, params);
    return cart.lastInsertRowid();
}

function addToCart(cartID, productID, quantity) {
    let sql = "INSERT INTO cartProducts (cartID, productID, quantity) VALUES (?, ?, ?);";
    const params = [cartID, productID, quantity];
    db.run(sql, params);
}

function getCartProducts(cartID) {
    let sql = "SELECT cp.*, p.product_name, p.description, p.imagepath, p.price FROM cartProducts cp INNER JOIN products p ON cp.productID = p.productID WHERE cp.cartID = ?;";
    return db.all(sql, cartID);
}


module.exports = {
    createCart,
    addToCart,
    getCartProducts,
};