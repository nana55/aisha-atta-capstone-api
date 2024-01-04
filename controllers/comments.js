const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getComments = async (_req, res) => {
    try {
        const data = await knex('comments')
            .select('comments.*', 'users.id as user_comment_id', 'users.name as userName', 'users.avatar')
            .join('users', 'comments.user_comment_id', 'users.id')
            .join('goals', 'comments.goals_comment_id', 'goals.id')
            .orderBy('comments.created_at', 'desc');;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Comments data: ${err}`)
    }
}

//-----Add New Comment
const addComment = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        //Verify JWT token
        const decoded = jwt.verify(token, 'secretkey');
        console.log("Received Token:", decoded);

        const newComment = {
            comment: req.body.comment,
            user_comment_id: decoded.id,
            goals_comment_id: req.body.goals_comment_id,
            created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        };
        const insertedComment = await knex('comments').insert(newComment);

        res.status(201).json({ message: 'A new comment has been added successfully', comment: insertedComment });
    } catch (err) {
        res.status(400).send(`Error creating goal: ${err}`)
    }
}

module.exports = {
    getComments,
    addComment,
}