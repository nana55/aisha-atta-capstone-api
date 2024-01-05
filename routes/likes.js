const router = require('express').Router();
const likeController = require('../controllers/likes.js');

router
    .route("/")
    .get(likeController.getLikes)
    .post(likeController.addLike);

module.exports = router;