const knex = require('knex')(require('../knexfile'));

const index = async (req, res) => {
    try {
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