const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');

const index = async (_req, res) => {
    try {
        const data = await knex('users');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Stars data: ${err}`)
    }
}

//----LOGIN
const login = async (req, res) => {

}

//----REGISTER
const register = async (req, res) => {
    try {
        // Check if the user exists before creating a new one
        const userExists = await knex('users').where('username', req.body.username).first();
        if (userExists) {
            return res.status(409).json("User already exists!")
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            //Create new user
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name
            };

            const result = await knex("users").insert(newUser);
            const newUserId = result[0];
            const createdUser = await knex("users").where({ id: newUserId });
            res.status(200).json(createdUser);
        }
    } catch (error) {
        res.status(500).json(`Error creating user: ${error}`);
    }

};

//----LOGOUT
const logout = async (req, res) => {

}


module.exports = {
    index,
    login,
    register,
    logout,
}