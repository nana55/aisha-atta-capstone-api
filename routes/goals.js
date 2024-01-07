const router = require('express').Router();
const goalController = require('../controllers/goals.js');

router
    .route("/")
    .get(goalController.getAllGoals)
    .post(goalController.create);

router
    .route("/user/:userId")
    .get(goalController.getGoalsbyAnyId);

router
    .route("/userid")
    .get(goalController.getGoalsbyId);


module.exports = router;