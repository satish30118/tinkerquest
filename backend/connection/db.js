const mongoose = require("mongoose");
const colors = require("colors");


const connectDB = async() =>{
    try {
        const DB = process.env.DATA_BASE;
        const con = await mongoose.connect(DB)
        console.log(`Connection success with: ${con.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`THROW ERROR: ${error}`.bgRed.white)
        
    }

}

module.exports = connectDB