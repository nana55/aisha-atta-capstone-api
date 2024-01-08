const router = require('express').Router();
const progressController = require('../controllers/progress.js');

router
    .route("/")
    .get(progressController.getAllProgress)
    .put( progressController.updateProgress);


module.exports = router;