const router = require('express').Router();
const likeController = require('../controllers/likes.js');

router
    .route("/")
    .get(likeController.index);

module.exports = router;