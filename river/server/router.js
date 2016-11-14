'use strict'
var Router = require("koa-router")
var router = new Router()

require("babel-polyfill");
require("babel-register")({
    extensions: [".es6", ".jsx"]
});

router.use(require("./middleware.es6").constants)

router.get("/",require("./controller/main.es6").index);
router.post("/weather",require("./controller/main.es6").weather);

router.all("*",require("./controller/main.es6").notFoundHandler);
router.use(require("./controller/main.es6").errorHandler);

module.exports = router;
