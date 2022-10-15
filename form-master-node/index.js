const express = require('express');

const server = express();

server.listen(5000,(err)=>{
    if(!err){
        console.log('Server start!');
    }else{
        console.error('Server start error!');
    }
})