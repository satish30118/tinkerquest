const Chat = require("../models/chatModel");



//CREATING NEW  CHAT;
const CreateChatController = async (req, res) => {
  try {
    const {message, sender } = req.body;

    //CREATING NEW CHAT
    const chat = await new Chat({message, sender }).save();
    if (chat) {
      res.status(201).send({
        message: "message send Successfully",
        chat,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN CREATE NEW CHAT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};




//GET ALL CHAT
const allChatController = async (req, res) => {
  try {
    const chats = await Chat.find({});
    res.status(200).send({
      message: "ALL REAGENT LIST",
       chats,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALLCHATS ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};



module.exports = {
  CreateChatController,
  allChatController,
};
