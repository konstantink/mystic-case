import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StyledEngineProvider } from "@mui/material/styles";

import "./App.css";
import { routes } from "./routes";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter(routes);
    console.log("Rendering app");
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <StyledEngineProvider injectFirst>
                    <RouterProvider router={router} />
                </StyledEngineProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};
// <BrowserRouter>
//     <Routes>
//     {routes.map((route, idx) => {
//         console.log(route);
//         return (<Route key={`route-idx-${idx}`} path={route.path} element={route.element} />)
//     })}

//     <Route path="/admin" element={<AdminApp />} />
//     <Route path="/admin" />
//     </Routes>
// </BrowserRouter>

export default App;
