"use strict";
const db = require("../models/db-conn");

async function addUser(email, name) {
    try {
        let sql = "INSERT INTO users (email, username, created) VALUES (?,?,?);";
        let created = new Date().toLocaleDateString('en-US');
        const params = [email, name, created];
        const newUser = await db.run(sql, params);
        return newUser.lastID;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }

}

async function getUserIDByEmail(email) {
    try {
    let sql = "SELECT userID FROM users WHERE email =?";
    const user = await db.get(sql, email);
    return user ? user.userID : null;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
}

module.exports = {
    addUser,
    getUserIDByEmail,
};