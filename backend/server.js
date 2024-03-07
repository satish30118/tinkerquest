const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./connection/db");
const authRoutes = require("./router/authRoute");


const cors = require("cors");

//CONFIGURE ENV
dotenv.config(); // dotenv.config({path:""}) if file is not in root folder

//DATABASE
connectDB();

//REST OBJECT
const app = express();

//MIDDELWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", authRoutes);

//REST API
app.get("/", (req, res) => {
  res.send("Hello Ji main aa gya");
});

//PORT and LISTEN SECTION
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`port is running at ${PORT}`.bgBlue);
});
