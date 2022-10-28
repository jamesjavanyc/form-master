const router = require("express").Router();
const Category = require("../models/Category");

router.get("/all",async (req,res)=>{
    try{
        console.log(1)
        let data = await Category.find({})
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;