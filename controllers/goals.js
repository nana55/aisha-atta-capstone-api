const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getAllGoals = async (req, res) => {
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
            .join('users', 'goals.user_id', 'users.id')
            .orderBy('goals.created_at', 'desc');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving goals data: ${err}`)
    }
}

//-----Create New Goal
const create = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);

        const newGoal = {
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            user_id: decoded.id, 
            created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        };
        const insertedGoal = await knex('goals').insert(newGoal);
            
        res.status(201).json({ message: 'Goal created successfully', goal: insertedGoal });
    } catch (err) {
        res.status(400).send(`Error creating goal: ${err}`)
    }
}

//---Get Goals by UserID
const getGoalsbyId = async (req, res) => {
    // const userId = req.params.userId;
   
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey'); 
        const data = await knex('goals')
            .select('goals.*', 'users.name as userName', 'users.avatar')
            .join('users', 'goals.user_id', 'users.id')
            .where('users.id', decoded.id)
            .orderBy('goals.created_at', 'desc');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving goals data: ${err}`)
    }
}


module.exports = {
    getAllGoals,
    create,
    getGoalsbyId,
}