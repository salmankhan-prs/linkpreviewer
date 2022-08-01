const express = require("express");
const cors = require("cors");
const router = require("./routes");
const app = express();
//To solve CORS issue
app.use(cors());
//to test the API
app.get("/api/v1/test", (req, res) => {
  res.status(200).send(`The Server is up and listening at ${req.get("host")} `);
});

//router to get meta tags details of specfic website
app.use("/api/v1", router);

module.exports = app;
