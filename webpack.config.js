const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public")
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }]
    },
    devServer: {
        static: { directory: path.join(__dirname, "public") },
        compress: true,
        port: 9000,
        client: {
            logging: "info",
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: false,
            }
        }
    }
}