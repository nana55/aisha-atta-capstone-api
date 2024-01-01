const router = require('express').Router();


router.get("/",(req,res) =>{
    res.send("Auth works!")
})

module.exports = router;