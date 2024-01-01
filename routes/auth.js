const router = require('express').Router();
const authController = require('../controllers/auth.js');

router
    .route("/")
    .get(authController.index);

module.exports = router;