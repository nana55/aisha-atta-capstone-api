const router = require('express').Router();


router.get("/",(req,res) =>{
    res.send("Users works!")
})

module.exports = router;