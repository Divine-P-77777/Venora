const mongoose = require("mongoose");
const { eventNames } = require("../app");

const EventSchema = new mongoose.Schema({


    eventName :{
        type: String,
        required: true,
        unique : true,
        

    },
    date:{
        type : Date,
        
        
    },
    isActive :{
        type: String,
        default : false
        
        
      

    },
   
})

const eventModel = mongoose.model("events", EventSchema)

module.exports = eventModel;