module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        "comma-dangle": ["warn", { objects: "always-multiline" }],
        indent: ["warn", 4],
        quotes: ["warn", "double"],
    },
    extends: [
        "semistandard",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
};
