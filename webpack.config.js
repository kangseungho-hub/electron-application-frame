const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./views/js/style.js', './views/js/window-controll.js', './views/js/search.js', './views/js/operation.js'],
    output: {
        path: path.resolve(__dirname, 'views'),
        filename: 'bundle.js',
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
        }, ],
    },

    watch: true,
};