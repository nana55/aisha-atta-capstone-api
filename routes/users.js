const router = require('express').Router();
const userController = require('../controllers/users.js');

router
    .route("/")
    .get(userController.index);

module.exports = router;