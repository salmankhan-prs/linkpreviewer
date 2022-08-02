//to process env files
require("dotenv").config();
//getting app object from app.js to start the srever
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT ${PORT}`);
});
