const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    sender:{
        senderName : String,
        city : String,
    }

})

const Chat = new mongoose.model("Chat", chatSchema)

module.exports = Chat;