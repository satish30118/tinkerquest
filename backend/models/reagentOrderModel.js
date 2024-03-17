const mongoose = require('mongoose')

const reagentOrderSchema = new mongoose.Schema({
    city:{
        type:String,
        trim : true
    },
    reagentName:{
        type: String,
        trim: true,
    },
    reagentUnit:{
        type:String,
        trim : true
    },
    reagentAmount :{
        type:Number,
        trim : true
    },
    reagentCost:{
        type:Number,
        trim : true
    },
    orderStatus:{
        type:String,
        default:"Ordred"
    }

},{timestamps:true})

const reagentOrder = new mongoose.model("ReagentOrder", reagentOrderSchema)

module.exports = reagentOrder;