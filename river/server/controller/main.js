'use strict'
var util = require("../lib/util");
var WeatherApp = util.getSharedComponent("index");
var ErrorContent = util.getSharedComponent("common","error.jsx");

var weather = function(req,res){
    var cityName = req.body.cityname;
    util.apiRequest("http://apistore.baidu.com/microservice/weather",{
        cityname:cityName
    }).then(function(ret){
        if(ret.errMsg === "success"){
            res.json({
                weatherFetched:true,
                result:ret.retData
            })
        }else{
            res.json({
                weatherFetched:false,
                errMsg:ret.errMsg
            })
        }
    })
}

var index = function(req,res,next) {
    util.apiRequest("http://apistore.baidu.com/microservice/weather",{
        cityname:"北京"
    }).then(function(ret){
        if(ret.errMsg === "success"){
            var initialState = {
                weather:ret.retData
            };
            var markup = util.getMarkupByComponent(WeatherApp({
                initialState:initialState
            }));
            res.render("index", {
                markup: markup,
                initialState:initialState
            });

        }else{
            next(new Error(ret.errMsg))
        }
    },function(){
        next(new Error("api request failed"))
    })
};

var errorHandler = function(err, req, res) {
    if (err) {
        var initialState = {
            msg: err.message
        };
        var markup = util.getMarkupByComponent(ErrorContent({
            initialState: initialState
        }));

        res.render('error', {
            markup: markup,
            initialState: initialState
        });
    } else {
        res.end();
    }
}

var notFoundHandler = function(req, res) {
    var initialState = {
        msg: "page not found"
    };
    var markup = util.getMarkupByComponent(ErrorContent({
        initialState: initialState
    }));

    res.render('error', {
        markup: markup,
        initialState: initialState
    });
}

module.exports = {
    index:index,
    weather:weather,
    notFoundHandler:notFoundHandler,
    errorHandler:errorHandler
};
