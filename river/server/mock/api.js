'use strict';
var _ = require("lodash");

var apiHandler = {
    all: function(req, res) {
        var apiName = req.params.api;
        var generator = require("./generator/" + apiName)
        var fakeJSON = templateParser(generator)
        res.json(fakeJSON)
    }
}

var templateParser = function(template){
    var result = {};
    _.forEach(template,function(value,key){
        if(_.isFunction(value) === true){
            result[key] = value.apply(this);
        }else if (_.isPlainObject(value) === true){
            result[key] = templateParser(value);
        }else{
            result[key] = value;
        }
    })
    return result;
}

module.exports = apiHandler;
