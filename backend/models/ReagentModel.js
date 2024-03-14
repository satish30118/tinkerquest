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
    reagentAmount :{
        type:Number,
    }

})

const Reagent = new mongoose.model("Reagent", reagentSchema)

module.exports = Reagent;