'use strict';
import nock from "nock";

describe("route /", function() {
    it("index route should response correct", function() {
        // var app = require("../bootstrap");
        nock(":9091").get("/").reply(200);
    })
});
