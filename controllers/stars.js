const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

const getStars = async (req, res) => {
    try {
        const { goalId } = req.query;

        const starsData = await knex('stars')
            .select('user_star_id')  
            .where('goals_star_id', goalId);

        const starCount = starsData.length;  

        res.status(200).json({ count: starCount, userIds: starsData.map(star => star.user_star_id) });
    } catch (err) {
        res.status(400).send(`Error retrieving stars count: ${err}`);
    }
};

//-----Add stars Comment
const addStar = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');

        const goalsStarId = req.body.goals_star_id;  

        if (!goalsStarId) {
            return res.status(400).json({ message: 'Missing goals_star_id in the request body' });
        }

        const newStarData = {
            user_star_id: decoded.id,
            goals_star_id: goalsStarId
        };
        const insertedStar = await knex('stars').insert(newStarData);

        res.status(201).json({ message: 'Star entry has been added successfully', star: insertedStar });
    } catch (err) {
        res.status(400).send(`Error creating stars: ${err}`)
    }
}

//-----Delete stars 
const deleteStar = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        const { goals_star_id } = req.body;

        // Find the star entry before deletion
        const deletedStar = await knex('stars')
            .where({
                user_star_id: decoded.id,
                goals_star_id: goals_star_id
            })
            .first();

        if (!deletedStar) {
            return res.status(404).json({ message: 'Star entry not found' });
        }

        // Delete the star entry
        await knex('stars')
            .where({
                user_star_id: decoded.id,
                goals_star_id: goals_star_id
            })
            .delete();

        res.status(200).json({ message: 'Star entry has been deleted successfully', deletedStar });
    } catch (err) {
        res.status(400).send(`Error deleting stars: ${err}`)
    }
}

module.exports = {
    getStars,
    addStar,
    deleteStar,
}