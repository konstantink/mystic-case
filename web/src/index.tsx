import React from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";

import "./index.css";

const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "Pangram",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    fontFamily: "Pangram",
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontFamily: "Pangram",
                },
            },
        },
    },
});

const rootElement = document.getElementById("root");
if (rootElement) {
    console.log("Creating root element");
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
