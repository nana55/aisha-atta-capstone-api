const router = require('express').Router();
const commentController = require('../controllers/comments.js');

router
    .route("/")
    .get(commentController.index);

module.exports = router;