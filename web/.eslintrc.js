module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    root: true,
    ignorePatterns: [
        "webpack.config.js",
        ".eslintrc.js"
    ],
    overrides: [
        {
            files: ["*ts", "*tsx"],
            rules: {
                indent: ["warn", 4],
                quotes: ["warn", "double"],
                "comma-dangle": ["warn", { objects: "always-multiline" }],
                "@typescript-eslint/no-non-null-assertion": [ "off" ],
                "no-use-before-define": [0, {
                    functions: false,
                    classes: false,
                    variables: false,
                    allowNamedExports: false,
                }],
            },
        },
    ],
    extends: [
        "semistandard",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
};
