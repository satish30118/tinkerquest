const nodemailer = require('nodemailer');
const genOTP = require('./genOTP');

let storeOTP;
const forgotpasswordOTP = (req, res) =>{
    storeOTP = genOTP();
    const {email} = req.body
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"satishresearch369@gmail.com",
            pass:"jfdq kqpf lhma csix",
        }
    });

    let mailTo = {
        from:"satishresearch369@gmail.com",
        to: email,
        subject:"Reset your password",
        text: `Your OTP for password reset is ${storeOTP}. \n If you are not then please ignore it \n HealthWare`
    }

    transporter.sendMail(mailTo, function (err, info){
        if(err){
            console.log(err)
            res.status(422).send("OTP can't send")
        }else{
            res.status(200).json({message:"OTP send"})
        }
    })


}

const verifyotp =(req, res)=>{
    const {inputOTP} = req.body;
    if(inputOTP == storeOTP){
        return res.status(200).send("OTP Matched")
    }else{
        return res.status(422).send("OTP not Matched")
    }
}

module.exports = {forgotpasswordOTP, verifyotp};