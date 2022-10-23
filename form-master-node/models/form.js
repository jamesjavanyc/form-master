const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    index:{
        type: String,
        unique:true,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    rootField:{
        type: String,
        required:true
    },
    status:{
        type: Array,
        required:true,
        default:["CREATED"]
    },
    lastModified:{
        type: String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Form",formSchema)