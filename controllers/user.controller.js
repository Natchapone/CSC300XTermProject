// controllers/user.controller.js
"use strict";

const model = require("../models/user.model");

async function addUser(email, name) {
   await model.addUser(email, name);
}


module.exports = {
    addUser,
};