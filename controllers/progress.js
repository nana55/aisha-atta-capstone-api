const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

const getAllProgress = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);

        const data = await knex('progress').select('*');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving progress data: ${err}`);
    }
};

const updateProgress = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);

        const { percentage, goalId } = req.body;

        // Validate that the logged-in user is the owner of the goal
        const isGoalOwner = await knex('goals').where({ id: goalId, user_id: decoded.id }).first();

        if (!isGoalOwner) {
            return res.status(403).json({ message: 'Forbidden - You do not have permission to update this progress' });
        }

        await knex('progress').update({ percentage: percentage }).where('goal_id', goalId);
        res.status(200).json({ message: 'Progress updated successfully' });
    } catch (err) {
        res.status(400).send(`Error updating progress data: ${err}`);
    }
};

module.exports = {
    getAllProgress,
    updateProgress,
};
