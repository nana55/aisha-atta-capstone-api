const express = require('express');
const app = express();
require("dotenv").config();
const authRoutes = require ("./routes/auth.js");
const userRoutes = require ("./routes/users.js");
const goalRoutes = require ("./routes/goals.js");
const commentRoutes = require ("./routes/comments.js");
const likeRoutes = require ("./routes/likes.js");
const starRoutes = require ("./routes/stars.js");
const cors = require ("cors");
const PORT = process.env.PORT || 5050;


// app.use( (req, res, next) => {
//     console.log("Using Middleware for incoming requests - paths & time")

//     const timestamp = new Date().toLocaleTimeString();
//     const path = req.path;

//     console.log(`Time: ${timestamp} and the path is: ${path}`);

//     next ();
// })


app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", goalRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/stars", starRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});