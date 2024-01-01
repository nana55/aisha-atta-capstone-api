const router = require('express').Router();


router.get("/",(req,res) =>{
    res.send("Comments works!")
})

module.exports = router;