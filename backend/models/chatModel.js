const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    sender:{
        senderId : String,
        senderName : String,
        city : String,
    }

},{timestamps:true})

const Chat = new mongoose.model("Chat", chatSchema)

module.exports = Chat;