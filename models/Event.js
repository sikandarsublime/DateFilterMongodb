const  mongoose =require("mongoose");

const EventsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

},{timestamps:true})


const Events=mongoose.model('Event',EventsSchema);

module.exports= Events;