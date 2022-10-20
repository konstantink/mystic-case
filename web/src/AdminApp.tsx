import * as React from "react";
import { Outlet } from "react-router-dom";

import AppAdminFrame from "./containers/admin/AppAdminFrame"

const AdminApp = () => {

    return (
        <AppAdminFrame>
            <Outlet />
        </AppAdminFrame>
    )
};

export default AdminApp;