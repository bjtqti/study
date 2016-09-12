var path = require("path");
 
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  devServer: { inline: true },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  }
};