// 开启服务
const express = require("express");
require('express-async-errors');
const server = express();
//加载配置文件.env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
const path = require("path");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
let ERROR = require("./utils/error")

// 配置dotenv
dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true }).
    then(console.log("database form master connected...")).catch(err => console.log(err));

const echoRoute = require("./routes/echo");
const moduleRoute = require("./routes/module");
const formRoute = require("./routes/form");
const categoryRoute = require("./routes/category");
const formTemplateRoute = require("./routes/form-template");
const authenticationRoute = require("./routes/authentication");

// 使用json
server.use(express.json())
//使用cookie 工具
server.use(cookieParser());
//跨域
server.use(cors())

/********************************
Express-session的使用 ： https://blog.51cto.com/u_5018054/3397153
secret
一个 String 类型的字符串，作为服务器端生成 session 的签名。
name
返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。
resave
强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。 don't save session if unmodified
saveUninitialized
强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。(默 认:true)。建议手动添加。
cookie
设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
rolling
在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
********************************/
//配置拦截和session
server.use(session({
    name:"sessionId",
    secret: 'form-master-express-session-secret',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        //5分钟无action自动登出
        maxAge: 5 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        touchAfter: 24 * 3600 // time period in seconds
    })
}))
server.all('/*', (req, res, next) => {
    //校验session 如果没有登陆 跳转登录页 如果登陆了 就放行
    if (req.session.user || req.url === "/auth/login") {
        next()
    } else {
        throw new Error(ERROR.AUTHENTICATION_ERROR);
    }
})
server.use("/auth", authenticationRoute);
server.use("/echo", echoRoute);
server.use("/module", moduleRoute);
server.use("/form", formRoute);
server.use("/category", categoryRoute);
server.use("/form-template", formTemplateRoute);

//配置全局异常处理
server.use((err, req, res, next) => {
    if(err.message === ERROR.AUTHENTICATION_ERROR){
        console.log("没登录")
        res.status(401).json("Please login.")
    }
    res.status(501).json("Not Implemented error capture.")
})


server.listen(5000, (err) => {
    if (!err) {
        console.log('Server start!');
    } else {
        console.error('Server start error!');
    }
})