const mongoose = require('mongoose')

const machineSchema = new mongoose.Schema({
    city:{
        type:String,
    },
    machineName:{
        type: String,
        trim: true,
    },
    category:{
        type:String,
        trim:true,
    },
    testName:{
        type:String,
        trim:true,
    },
    reagent:[{
        reagentName : String,
        reqPerTest : Number,
    }
    ]
     
})

const Machine = new mongoose.model("Machine", machineSchema)

module.exports = Machine;