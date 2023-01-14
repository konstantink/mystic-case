import * as React from "react";
// import logo from './logo.svg';
import "./App.css";

// import { ConnectedRouter } from "connected-react-router";
// import { History } from "history";
// import { Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

// interface AppProps {
//     history?: History
// }

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <React.Fragment>
            <RouterProvider router={router} />
            {/* <BrowserRouter>
                <Routes>
                    {routes.map((route, idx) => {
                        console.log(route);
                        return (<Route key={`route-idx-${idx}`} path={route.path} element={route.element} />)
                    })}

                    <Route path="/admin" element={<AdminApp />} />
                    <Route path="/admin" />
                </Routes>
            </BrowserRouter> */}
        </React.Fragment>
    );
};

export default App;
