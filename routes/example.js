var express = require('express');
var router = express.Router();

router.get('/get',(req, res)=>{
    res.send("Hello")
})

router.get('/another',(req,res)=>{
    res.send("Another")
})

module.exports = router;