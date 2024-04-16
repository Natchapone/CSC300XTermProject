const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get(
    "/google",
    passport.authenticate("google", {
        keepSessionInfo: true,
        scope: [
            "https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        keepSessionInfo: true,
        failureRedirect: "/",
    }),
    async (req, res) => {
        try {
        console.log("Google authentication successful!");
        console.log("User:", req.user);

        const email = req.user.emails[0].value;
        const name = req.user.displayName;
        
        await userController.addUser(email, name);

        req.session.returnTo = "/";
        res.redirect(req.session.returnTo);
        } catch (error) {
            console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
        }
    }
);

router.get("/login", (req, res) => {
 //console.log("=====" + req.session.returnTo)
    res.render("products");
});

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;