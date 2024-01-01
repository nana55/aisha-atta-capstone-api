const router = require('express').Router();


router.get("/",(req,res) =>{
    res.send("Likes works!")
})

module.exports = router;