const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const data = await knex('users');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Stars data: ${err}`)
    }
}

module.exports = {
    index,
}