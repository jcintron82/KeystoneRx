const express = require("express");
const router = express.Router();
const passport = require("passport");
const menuController = require("../controllers/viewmenu");
const registerController = require("../controllers/register");
const cartController = require("../controllers/cart");

router.post("/postLogin", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      debug: true,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({ message: "Credentials Successfully Received! See your requested information below." });
        });
      }
    }
  )(req, res, next);
});

router.get("/getUser", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: req.user });
  } else {
    console.log("Bad Auth");
    res.json({ message: "Bad auth" });
    res.redirect('http://localhost:3000/register');
  }
});

router.post('/logout', function(req, res, next) {
  req.logOut(function(err) {
    console.log(req.user)
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/');
  });
});


router.post("/register", registerController.postUser);
// router.post("/scrape", scrapeController.getScrape);
router.post("/viewmenu", menuController.postChoice);
router.get("/viewmenu", menuController.getMenu);

router.post("/cartPost", cartController.postCartItem);


module.exports = router;
