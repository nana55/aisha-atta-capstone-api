const router = require('express').Router();
const userController = require('../controllers/users.js');

router
    .route("/profile/:id")
    .get(userController.getUserbyId);

module.exports = router;