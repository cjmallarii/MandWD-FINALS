const express = require("express");

const router = express.Router();
const userController = require("../controllers/User-Controller.js");
const { verify } = require("../auth.js");


router.post("/register", userController.registerUser);


router.post("/login", userController.loginUser);


router.post("/check-email", userController.checkEmail);


router.post("/details", verify, userController.getProfile);


router.get("/details", verify, userController.getProfile);


router.post("/enroll", verify, userController.enroll);


router.put("/update-password", verify, userController.updatePassword);



module.exports = router;