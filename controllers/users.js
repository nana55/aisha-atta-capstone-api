const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


const getUserbyId = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        const userId = req.params.id;

        const user = await knex('users')
            .select('id', 'name', 'email', 'username', 'avatar')
            .where('id', userId)
            .first(); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(`Error retrieving user data: ${err}`);
    }
}

module.exports = {
    getUserbyId,
}