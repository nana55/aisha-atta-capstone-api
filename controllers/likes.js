const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

const getLikes = async (req, res) => {
    try {
        const { goalId } = req.query;

        const likeCount = await knex('likes')
            .count('id as count') 
            .where('goals_like_id', goalId)
            .first();

        const count = likeCount.count;

        res.status(200).json({ count });
    } catch (err) {
        res.status(400).send(`Error retrieving likes count: ${err}`);
    }
};

module.exports = {
    getLikes,
}