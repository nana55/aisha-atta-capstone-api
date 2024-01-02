const express = require('express');
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const goalRoutes = require("./routes/goals.js");
const commentRoutes = require("./routes/comments.js");
const likeRoutes = require("./routes/likes.js");
const starRoutes = require("./routes/stars.js");
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const cookieParser = require('cookie-parser');
const corsOptions = {
    origin:'http://localhost:5173'
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/stars", starRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});