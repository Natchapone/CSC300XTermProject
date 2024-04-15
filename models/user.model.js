"use strict";
const db = require("../models/db-conn");

function createUser(username, email, password) {
  let sql = "INSERT INTO users (username, email, password) VALUES (?,?,?);";
  return db.run(sql, username, email, password);
}

