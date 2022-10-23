const router = require("express").Router();
const Status = require("../models/Status");

router.post("/",async (req,res)=>{
    try{
        console.log(req.body)
        res.status(200).json(req.body);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;