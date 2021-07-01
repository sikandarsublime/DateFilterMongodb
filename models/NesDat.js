const  mongoose =require("mongoose");

const SunSchema=new mongoose.Schema({
    trackTitle:{
        type:String,
        
    },
    publishAt:{
        type:Date,
    }

},{timestamps:true})


const Sun=mongoose.model('Sun',SunSchema);

module.exports= Sun;