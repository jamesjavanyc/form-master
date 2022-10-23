const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            password:hashedPass
        }); 
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/login",async (req, res)=>{
    try{
        const user = await  User.findOne({username: req.body.username});
        !user && res.status(401).json("Username is not found.");
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(401).json("Password not match.");
        console.log(user._doc);
        const {password, ...others} = user._doc;
        console.log(others);
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/update",async (req, res)=>{
    try{
        let user = await  User.findOne({username: req.body.username});
        !user && res.status(401).json("Username is not found.");
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(401).json("Password not match.");

        user.password = req.body.newPassword
        user = await user.save()

        console.log(user._doc);
        const {password, ...others} = user._doc;
        console.log(others);
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;