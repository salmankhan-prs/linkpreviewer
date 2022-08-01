const getMetaData = require("../controllers/metaTags");

const router = require("express").Router();
//pass the control togetMetaData function
router.get("/meta", getMetaData);

module.exports = router;
