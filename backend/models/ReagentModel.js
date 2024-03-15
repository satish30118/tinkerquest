const mongoose = require('mongoose')

const reagentSchema = new mongoose.Schema({
    city:{
        type:String,
    },
    reagentName:{
        type: String,
        trim: true,
        required :true,
    },
    reagentUnit:{
        type:String,
        trim : true
    },
    reagentAmount :{
        type:Number,
    }

},{timestamps:true})

const Reagent = new mongoose.model("Reagent", reagentSchema)

module.exports = Reagent;