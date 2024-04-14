"use strict";
const express = require("express");
const multer = require("multer");
const helmet = require('helmet');
const app = express();

app.use(helmet.contentSecurityPolicy({
    directives: {
    defaultSrc: ["'none'"],
    scriptSrc: ["'self'", "http://lazyload.org"],
  }
}));


const path = require("path");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const productRouter = require("./routes/product.route");
//const cartRouter = require("./routes/cart.route");
app.use("/products", productRouter);
//app.use("/cart", cartRouter);


app.get("/", (req, res) => {
  res.json({ message: "You are at the home page!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
