"use strict";
const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
//const cartRouter = require("./routes/cart.route");
app.use("/products", productRouter);
//app.use("/cart", cartRouter);
app.use("/users", userRouter);

app.get("/products", (req, res) => {
  res.render("products");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
