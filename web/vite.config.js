// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

export default defineConfig({
    build: {
        outDir: "dist",
        assetsDir: "assets",
    },
    plugins: [react()],
    publicDir: "../assets/public",
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8085",
            },
        },
    },
    resolve: {
        alias: {
            "@mysticcase/api": path.resolve(__dirname, "src/api"),
            "@mysticcase/icons": path.resolve(__dirname, "src/icons"),
            "@mysticcase/services/auth": path.resolve(__dirname, "src/services/auth/index.ts"),
            "@mysticcase/storage-helper": path.resolve(__dirname, "src/services/storage/index.ts"),
            "@mysticcase/ui": path.resolve(__dirname, "src/components/ui"),
            "@mysticcase": path.resolve(__dirname, "src"),
            "@styles": path.resolve(__dirname, "../assets/public/assets/styles"),
        },
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    css: {
        modules: {
            // localsConvention: "dashesOnly",
        }
    }
});