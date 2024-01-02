const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

const index = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);
        const data = await knex('goals')
            .select('goals.*', 'users.name as userName', 'users.avatar')
            .join('users', 'goals.user_id', 'users.id');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving goals data: ${err}`)
    }
}

module.exports = {
    index,
}