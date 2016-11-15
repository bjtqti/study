'use strict'
var express = require('express');

var router = express.Router();

require("babel-core/register")({
    optional:["runtime"],
    extensions: [".es6", ".jsx"]
});

router.get("/",require("./controller/main.js").index);
router.post("/weather",require("./controller/main.js").weather);

router.all("*",require("./controller/main.js").notFoundHandler);
router.use(require("./controller/main.js").errorHandler);

module.exports = router;
