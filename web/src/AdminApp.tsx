import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider, Routes } from "react-router-dom";

import AppAdminFrame from "./containers/admin/AppAdminFrame"
import AdminRoute from "./containers/admin/AdminRoute";
import { adminRoutes } from "./router";



const AdminApp = () => {
    //const { path, url } = useRouteMatch();
    const router = createBrowserRouter(adminRoutes);

    return (
        <AppAdminFrame>
            <Outlet />
        </AppAdminFrame>
    )
};

export default AdminApp;