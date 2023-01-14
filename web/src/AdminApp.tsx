import * as React from "react";
import { Outlet } from "react-router-dom";

import AppAdminFrame from "./containers/admin/AppAdminFrame";
import { AuthProvider } from "./hooks/useAuth";

export const AdminApp = () => {
    return (
        <AuthProvider>
            <AppAdminFrame>
                <Outlet />
            </AppAdminFrame>
        </AuthProvider>
    );
};

export default AdminApp;
