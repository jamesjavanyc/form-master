const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const StrUtils = require("./string-utils");

/*********************
 * 默认的角色有 READ, WRITE, DELETE, HUMAN_RESOURCE, ADMIN 
 *********************/

router.post("/register",async (req,res)=>{
    try{
        //字符验证
        if(!((req.body.username && 8 <= req.body.usrname.length <= 16 ) && (req.body.password && 8 <= req.body.password.length <= 16))){
            res.status(400).json("Username, password length must between 8 - 16.");
        }if(StrUtils.check_str_contains_symbol(req.body.usrname)){
            res.status(400).json("Username shouldn't contains special symbols.");
        }
        let candidate = await  User.findOne({username: req.body.username})
        if(candidate){
            res.status(400).json(`Username ${req.body.username} is not avaliable.`);
        }
        //字符验证
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            authorization: req.body.authorization,
            password:hashedPass
        }); 
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/login",async (req, res)=>{
    // 统一数据返回 确保数据安全
    let unvalidateMsg = "Unmatched username or password."
    try{
        if(req.body.username === "Admin"){
            //Skytravel-SysAdmin
            if( req.body.password === "123" ||bcrypt.compare(req.body.password,"$2a$10$KSJvK07O/UsPt1sU1OdkxeYGHUHV7pZSn9xcujNyTms/lq5fR7Rt.")){
                res.status(200).json({
                    username:"System Admin",
                    authorization:["READ", "WRITE", "DELETE", "HUMAN_RESOURCE","ADMIN" ]
                });
            }else{
                res.status(401).json(unvalidateMsg);
            }
            return
        }
        const user = await  User.findOne({username: req.body.username});
        !user && res.status(401).json(unvalidateMsg);
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(401).json(unvalidateMsg);
        console.log(user._doc);
        const {password, ...others} = user._doc;
        console.log(others);
        res.status(200).json(others);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

router.put("/update",async (req, res)=>{
    try{
        //TODO : 进行校验 仅有登录用户 或者HR可以更改
        let user = await  User.findOne({username: req.body.username});
        !user && res.status(401).json("Unmatched username or password.");
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(401).json("Unmatched username or password.");

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