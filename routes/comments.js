const router = require('express').Router();
const commentController = require('../controllers/comments.js');

router
    .route("/")
    .get(commentController.getCommentsByGoal)
    .post(commentController.addComment);

module.exports = router;