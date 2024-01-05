const router = require('express').Router();
const starController = require('../controllers/stars.js');

router
    .route("/")
    .get(starController.getStars)
    .post(starController.addStar)
    .delete(starController.deleteStar);

module.exports = router;