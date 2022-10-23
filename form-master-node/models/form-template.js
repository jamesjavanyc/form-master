const mongoose = require('mongoose');

const formTemplateSchema = new mongoose.Schema({
    title:{
        type: String,
        unique:true,
        required:true
    },
    category:{
        type:Array,
        required:true,
    },
    rootField:{
        type: String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Form-Template",formSchema)