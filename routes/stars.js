const router = require('express').Router();


router.get("/",(req,res) =>{
    res.send("Stars works!")
})

module.exports = router;