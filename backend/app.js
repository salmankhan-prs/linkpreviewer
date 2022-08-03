const express = require("express");
const cors = require("cors");
const router = require("./routes");
const app = express();
//To solve CORS issue
app.use(cors());
//to test the API
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h5>The Server is up and listening at ${req.get(
        "host"
      )} .</h5><h5>Please visit at ${req.protocol}://${req.get(
        "host"
      )}/api/v1/meta?url=websitename </h5>`
    );
});

//router to get meta tags details of specfic website
app.use("/api/v1", router);

module.exports = app;
