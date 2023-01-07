const path = require("path");
const nodeExternals = require('webpack-node-externals');

const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: prod ? 'production' : 'development',
    //context: path.resolve(__dirname),
    entry: './src/index.tsx',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public'),
    },
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    // externalsPresets: {
    //     node: true // in order to ignore built-in modules like path, fs, etc. 
    // },
    target: "web",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        fallback: {
            path: require.resolve("path-browserify") 
        },
        mainFields: ["browser", "loader", "main"],
        modules: ["node_modules"],
    },
    // resolveLoader: {
    //     modules: ['node_modules'],
    //     extensions: ['.js', '.json', '.ts'],
    //     mainFields: ['loader', 'main'],
    // },
    devtool: prod ? undefined : 'source-map',
    devServer: {
        //historyApiFallback: true,
        liveReload: true,
        static: path.resolve(__dirname, "public"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new MiniCssExtractPlugin(),
    ],
    
};