'use strict';

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var reqwest = require("reqwest");
var _ = require("lodash");

var util = {
    getSharedComponent: function(entryPath, entryFile) {
        entryFile = entryFile || "app.jsx";
        var componentPath = "../../shared/chunk/" + entryPath + "/" + entryFile;
        return React.createFactory(require(componentPath));
    },
    getMarkupByComponent: function(component) {
        return ReactDOMServer.renderToString(component);
    },
    apiRequest: function(url, param, options) {
        var defaultOptions = {
            url: url,
            data: param,
            method: "get",
            type: "json"
        };
        _.extend(defaultOptions, options);
        return reqwest(defaultOptions);
    }
}

module.exports = util;
