const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    authorization:{
        type:Array,
        required:true,
        default:["READ,"]
    },
},{timestamps:false});

module.exports = mongoose.model("User",userSchema)