'use strict'
var os = require("os");

var getLanIP = function(){
    var interfaces = os.networkInterfaces();
    var IPv4 = '127.0.0.1';
    for (var key in interfaces) {
      interfaces[key].forEach(function(details){
        if (details.family == 'IPv4' && /^en\d{1}$/.test(key) === true  ) {
            IPv4 = details.address;
        }
      });
    }
    return IPv4;
}

module.exports = {
    getLanIP:getLanIP
}