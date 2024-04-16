"use strict";
const db = require("../models/db-conn");

function addUser(email, name) {
    let check = "SELECT * FROM users WHERE email = ?;";
    let existingUser = db.get(check, email);
    if (existingUser) {
        console.log("User already exists");
        return; 
    }
    let sql = "INSERT INTO users (email, username, created) VALUES (?,?,?);";
    let created = new Date().toLocaleDateString('en-US');
    const params = [email, name, created];
    db.run(sql, params);
}

module.exports = {
    addUser,
};