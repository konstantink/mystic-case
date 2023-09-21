const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const prod = process.env.NODE_ENV === "production";

const ESLintPlugin = require("eslint-webpack-plugin"); // eslint-disable-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin"); // eslint-disable-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // eslint-disable-line @typescript-eslint/no-var-requires
// const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: prod ? "production" : "development",
    context: path.resolve(__dirname),
    entry: [
        "./src/index.tsx"
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/js"),
        publicPath: prod ? "/assets/" : "/",
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "application/octet-stream",
                        },
                    }
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "image/svg+xml",
                        },
                    }
                ],
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: path.resolve(__dirname, "dist/images"),
                        },
                    }
                ],
            },
            {
                test: /\.s?[ac]ss$/,
                use: [prod ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        alias: {
            "@mysticcase/services/auth": path.resolve(__dirname, "src/services/auth/index.ts"),
            "@mysticcase/storage-helper": path.resolve(__dirname, "src/services/storage/index.ts"),
            "@mysticcase/ui": path.resolve(__dirname, "src/components/ui"),
            "@mysticcase": path.resolve(__dirname, "src"),
            "@styles": path.resolve(__dirname, "../assets/public/assets/styles"),
        },
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devtool: prod ? undefined : "source-map",
    devServer: {
        allowedHosts: [
            "mysticcase.io",
            "localhost",
            "127.0.0.1",
        ],
        static: {
            directory: path.resolve(__dirname, "../assets/public/assets"),
            publicPath: "/assets/"
        },
        proxy: {
            "/api": "http://127.0.0.1:8085",
        },
        client: {
            logging: "verbose",
        },
        historyApiFallback: true,
    //     liveReload: true,
    },
    plugins: [
        new ESLintPlugin({
            extensions: ["js", "jsx", "json", "ts", "tsx"],
            fix: true,
        }),
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            minify: {
                removeComments: true,
                // collapseWhitespace: true
            },
            inject: true,
        }),
        new MiniCssExtractPlugin(),
        // new CheckerPlugin()
    ],
};
