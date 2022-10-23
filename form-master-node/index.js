// 开启服务
const express = require("express");
const server = express();
//加载配置文件.env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
const path = require("path");

// 配置dotenv
dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true,  useFindAndModify:true}).
    then(console.log("database myblog connected...")).catch(err=> console.log(err));

const echoRoute = require("./routes/echo");
const moduleRoute = require("./routes/module");
const formRoute = require("./routes/form");
const categoryRoute = require("./routes/category");
const formTemplateRoute = require("./routes/form-template");
const authenticationRoute = require("./routes/authentication");

// 使用json
server.use(express.json());
//跨域
server.use(cors());
//配置路由
server.use("/echo",echoRoute);
server.use("/module",moduleRoute);
server.use("/form",formRoute);
server.use("/module",categoryRoute);
server.use("/form",formTemplateRoute);
server.use("/form",authenticationRoute);


server.listen(5000,(err)=>{
    if(!err){
        console.log('Server start!');
    }else{
        console.error('Server start error!');
    }
})