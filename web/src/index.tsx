import React from 'react';
import ReactDOM from 'react-dom';

import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from './App';
import { AuthProvider } from "./hooks/useAuth";
import * as serviceWorker from './serviceWorker';

import './index.css';

const history = createBrowserHistory();
const store = createStore(combineReducers({
    router: connectRouter(history),
}));
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
                }
            }
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

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AuthProvider>
                    <App history={history}/>
                </AuthProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
