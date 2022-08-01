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
      `The Server is up and listening at ${req.get(
        "host"
      )} .<h2>Please visit at ${req.get(
        "host"
      )}/api/v1/meta?url=websitename </h2>`
    );
});

//router to get meta tags details of specfic website
app.use("/api/v1", router);

module.exports = app;
