const mongoose = require("mongoose");

const testNameSchema = new mongoose.Schema({
    testName:{
        type:String,
        required:true,
        unique:true,
    },
    testCategory:{
        type:String,
        required:true,
    },
    testPrice:{
       type:Number, 
    }
})

const TestName = mongoose.model("TestName", testNameSchema)

module.exports = TestName;