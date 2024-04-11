"use strict";
const express = require("express");
const multer = require("multer");
const app = express();
const path=require("path");


app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const menuRouter = require("./routes/menu.route");
const userRouter = require("./routes/user.route");
app.use("/menu", menuRouter);
app.use("/users", userRouter);


app.get("/", (req, res) => {
  res.json({ message: "You are at the home page!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
