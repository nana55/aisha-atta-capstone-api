const router = require('express').Router();
const starController = require('../controllers/stars.js');

router
    .route("/")
    .get(starController.index);

module.exports = router;