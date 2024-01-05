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

//-----Add Likes Comment
const addLike = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);

        const newLikeData = {
            user_like_id: decoded.id,
            goals_like_id: req.body.goals_like_id
        };
        const insertedLike = await knex('likes').insert(newLikeData);

        res.status(201).json({ message: 'Like entry has been added successfully', like: insertedLike });
    } catch (err) {
        res.status(400).send(`Error creating goal: ${err}`)
    }
}
module.exports = {
    getLikes,
    addLike,
}