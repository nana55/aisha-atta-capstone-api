const router = require('express').Router();
const goalController = require('../controllers/goals.js');

router
    .route("/")
    .get(goalController.index)
    .post(goalController.create);

module.exports = router;