const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./connection/db");
const authRoutes = require("./router/authRoute");
const bookingRoutes = require("./router/bookingRoute");
const testRoutes = require("./router/testRoute");
const machineRoutes = require("./router/machineRoute");
const reagentRoutes = require("./router/reagentRoute");
const chatRoutes = require("./router/chatRoute");

const bodyParser = require("body-parser");

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
app.use(bodyParser.json());

//ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/machine", machineRoutes);
app.use("/api/v1/reagent", reagentRoutes);
app.use("/api/v1/chat", chatRoutes);

//REST API
app.get("/", (req, res) => {
  res.send("Hello Ji main aa gya");
});

app.post("/predict", (req, res) => {
  res.send("");
});

//PORT and LISTEN SECTION
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`port is running at ${PORT}`.bgBlue);
});
