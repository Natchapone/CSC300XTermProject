// controllers/user.controller.js
"use strict";

const model = require("../models/user.model");


async function addUser(email, name) {
   try {
    const userID = await model.addUser(email, name);
    console.log("User added:", userID);
    return userID; 
   } catch (error) {
    console.error("Error creating user:", error);
    throw error;
   }
}


async function getUserIDByEmail(email) {
    try {
        const userID = await model.getUserIDByEmail(email);
        console.log("Retrieved userID:", userID);
        return userID;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
}


module.exports = {
    addUser,
    getUserIDByEmail,
};