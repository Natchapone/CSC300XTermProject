// controllers/user.controller.js
"use strict";

const model = require("../models/user.model");
const cModel = require("../models/cart.model");

async function addUser(email, name) {
   try {
    const userID = await model.addUser(email, name);
    return userID;
   } catch (error) {
    console.error("Error creating user:", error);
    throw error;
   }
}

async function createUser(req, res) {
    try {
        const userData = req.body; // Assuming user data is available in the request body
        const email = userData.email;
        const name = userData.name;

        userID = await model.addUser(email, name);

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function getUserIDByEmail(email) {
    try {
    const user = await model.getUserIDByEmail(email);
    return user ? user.userID : null;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
}


module.exports = {
    addUser,
    createUser,
    getUserIDByEmail,
};