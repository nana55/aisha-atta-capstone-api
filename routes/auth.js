const router = require('express').Router();
const authController = require('../controllers/auth.js');

router
    .route("/")
    .get(authController.index);

router
    .route("/login")
    .post(authController.login)

router
    .route("/register")
    .post(authController.register)

router
    .route("/logout")
    .post(authController.logout);

module.exports = router;