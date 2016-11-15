var babel = require("babel-core");
// var ReactTools = require("react-tools");

module.exports = {
    process: function(src,filename) {
        var stage = process.env.BABEL_JEST_STAGE || 2;
        if (filename.indexOf("node_modules") === -1 && babel.canCompile(filename)) {
            return babel.transform(src, {
                filename: filename,
                stage: stage,
                retainLines: true,
                auxiliaryCommentBefore: "istanbul ignore next"
            }).code;
        }
        return src;
    }
};
