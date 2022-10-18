// 开启服务
const express = require("express");
const server = express();
//加载配置文件.env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
const path = require("path");

//跨域
server.use(cors());

const echoRoute = require("./routes/echo");

dotenv.config();
// 使用json
server.use(express.json());


server.use("/echo",echoRoute);

server.listen(5000,(err)=>{
    if(!err){
        console.log('Server start!');
    }else{
        console.error('Server start error!');
    }
})