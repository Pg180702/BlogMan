const express = require("express");
const userRoute = require("../controllers/user.controller");

const router = express.Router();

router.route("/register").post(userRoute.registerUser);
router.route("/login").post(userRoute.loginUser);
router.route("/profile").get(userRoute.profileView);
router.route("/logout").post(userRoute.logout);

module.exports = router;
