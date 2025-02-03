const nodemailer = require("nodemailer");
const genOTP = require("./genOTP");

let storeOTP;
const sendOTP = (req, res) => {
  storeOTP = genOTP();
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "satishresearch369@gmail.com",
      pass: "jfdq kqpf lhma csix",
    },
  });

  let mailTo = {
    from: "satishresearch369@gmail.com",
    to: email,
    subject: "Email Verification",
    text: ` Dear User,
    Thank you for registering with HealthWare. To complete the registration process and verify your email address, please use the following One-Time Password (OTP):
    
    OTP: ${storeOTP}
    
    Please enter this OTP on the verification page . If you did not request this verification or if you encounter any issues, please contact our support team immediately.
    
    Once your email address is verified, you'll have full access to all features and functionalities of HealthWare.
    
    Thank you for choosing HealthWare.
    
    Best regards,
    HealthWare`,
  };

  transporter.sendMail(mailTo, function (err, info) {
    if (err) {
      console.log(err);
      return res.status(201).send({ message: " can't Sent" });
    } else {
      console.log(info);
      return res.status(200).send({ message: " OTP Sent" });
    }
  });
};

const emailVerification = (req, res) => {
  const { otp } = req.body;
  if (otp == storeOTP) {
    return res.status(200).send({ success: true, message: "OTP Matched" });
  } else {
    return res.send({ success: false, message: "OTP not Matched" });
  }
};

module.exports = { sendOTP, emailVerification };
