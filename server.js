"use strict";
const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth
const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./auth/auth.route'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
app.use("/products", productRouter);
app.use("/cart", cartRouter);



app.get("/products", (req, res) => {
  res.render("products");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
