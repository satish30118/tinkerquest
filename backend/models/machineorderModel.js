const mongoose = require('mongoose')

const machineSchema = new mongoose.Schema({
    city:{
        type:String,
    },
    machineName:{
        type: String,
        trim: true,
    },
    machineUnitOrder:{
        type: Number,
        trim: true,
    },
    machineCost:{
        type: Number,
        trim: true,
    },
    testLimit:{
        type: Number,
        trim: true,
    },
    testCategory:{
        type:String,
        trim:true,
    },
    testName:{
        type:String,
        trim:true,
    },
    reagent:[{
        reagentName : String,
        reagentUnit : String,
        reqPerTest : Number,
    }
    ],
    orderStatus:{
        type:String,
        default:"Ordered"
    }
     
},{
    timestamps :true
})

const machineOrder = new mongoose.model("machineOrder", machineSchema)

module.exports = machineOrder;