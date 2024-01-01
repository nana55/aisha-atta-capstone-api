const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

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
    try{
        //Check if the user exists with the username
        const user = await knex('users').where('username', req.body.username).first();
        if (!user){
            return res.status(404).json("User not found!");
        }

        //Check for password match
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch){
            return res.status(400).json("The Password is incorrect");
        }

        const token = jwt.sign({id:user.id}, "secretkey");
        const { password, ...userData } = user;
        res.cookie("accessToken", token, {
            httpOnly:true,
        });

        res.status(200).json(userData);
    }catch (err){
        console.error(err);
        res.status(500).json(`Error during login: ${err.message}`);
    }
};

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