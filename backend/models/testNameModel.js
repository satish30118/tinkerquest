const mongoose = require("mongoose");

const testNameSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
    }
})

const TestName = mongoose.model("TestName", testNameSchema)

module.exports = TestName;