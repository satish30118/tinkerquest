const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, city, answer } = req.body;

    //VALIDATION
    if (!name || !email || !password || !phone || !city || !answer) {
      return res.status(422).send({
        success: false,
        message: "ALL field are not filled",
      });
    }

    //CHECKING EXISTING USER
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(200).send({
        success: false,
        message: "user already registerd",
      });
    }

    //HASHING PASSWORD
    const hashedPassword = await hashPassword(password);
    //CREATING NEW USER
    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
      answer,
    }).save();
    //or newUser.save()

    //GENRATING TOKEN
    const KEY = process.env.JWT_SECRET_KEY;
    const token = await jwt.sign({ _id: newUser._id }, KEY, {
      expiresIn: "10d",
    });

    if (newUser) {
      return res.status(201).send({
        success: true,
        message: "User registered successfully",
        userDetails: {
          _id:newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          city:newUser.city,
          isAdmin: newUser.isAdmin,
        },
        token: token,
      });
    }
  } catch (error) {
    console.log(`GET ERROR IN REGISTER CONTROLLER:- ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

///LOGIN///

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //VALIDATION
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //CHECKING USER
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User email not registered",
      });
    }

    //COMPARING PASSWORD
    const matchPassowrd = await comparePassword(password, user.password);
    if (!matchPassowrd) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //GENRATING TOKEN
    const KEY = process.env.JWT_SECRET_KEY;
    const token = await jwt.sign({ _id: user._id }, KEY, { expiresIn: "10d" });

    res.status(201).send({
      success: true,
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        isAdmin: user.isAdmin,
      },
      token: token,
    });
  } catch (error) {
    console.log(`GET ERROR IN LOGIN CONTROLLER:- ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

///FORGOT PASSWORD
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      res.status(400).send({
        success: false,
        message: "Fill all data correctly",
      });
      return;
    }

    //FINDING USER
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(422).send({
        success: false,
        message: "Invalid Password or answer",
      });
      return;
    }

    //HASHING NEWPASSWORD
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
    return;
  } catch (error) {
    console.log(`FORGOT PASSWORD ERROR:- ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

const testController = (req, res) => {
  res.send("middleware");
};

/* GET ALL USER DETAILS */
const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel
      .find({}, {projection:{password:0}})
      .sort({ isAdmin: -1 });
    res.status(200).send({
      message: "All User details",
      allUser,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL USER ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* User Update*/
const updateUser = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isAdmin : status },
      { new: true },
      {projection:{password:0}}
    );

    if (updatedUser) {
      res.status(200).send({
        message: " updated Successfully",
        updatedUser,
      });
    }
  } catch (error) {
    console.log(`ERROR IN update booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* Delete USER DETAILS */
const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const userDeleted = await userModel
      .findByIdAndDelete({_id:id}, {projection:{password:0}});
    res.status(200).send({
      message: " User deleted",
      userDeleted,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL USER ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUser,
  updateUser,
  deleteUser
};
