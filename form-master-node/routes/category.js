const router = require("express").Router();
const Category = require("../models/Category");

router.get("/all",async (req,res)=>{
    let data = await Category.find({})
    res.status(200).json(data);
});

module.exports = router;