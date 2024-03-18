const { spawn } = require("child_process");
const mlConnect = async (req, res) => {
  try {
    const {city, day} = req.body;
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();

    const childPython = spawn("python", [
      "./ml_file/main.py",
     city,
      `${y}-${m}-${d}`,
     day
    ]);

    var sendData;
    childPython.stdout.on("data", (data) => {
      console.log(`stdout:  ${data}`);
      sendData = data.toString();
    });

    childPython.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    childPython.on("close", (code) => {
      console.log(`child process exited with code: ${code}`);
      res.status(200).json({prediction: sendData})
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = mlConnect;
