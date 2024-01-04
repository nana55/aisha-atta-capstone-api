const router = require('express').Router();
const commentController = require('../controllers/comments.js');

router
    .route("/")
    .get(commentController.getComments)
    .post(commentController.addComment);

module.exports = router;