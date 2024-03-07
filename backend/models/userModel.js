const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        reuired:true,
    },
    phone:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
}, {timestamps:true})

const userModel = new mongoose.model("User", userSchema)
module.exports = userModel;