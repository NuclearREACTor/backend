var express = require("express");
var router = express.Router();

router.post("/payNow", function (req, res, next) {
    console.log(req.body);
      res.send("Ready for Payment");
    });
   
    

    module.exports = router;