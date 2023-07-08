import * as React from "react";
import { Outlet } from "react-router-dom";

import AppAdminFrame from "./containers/admin/AppAdminFrame";
import { AuthHandler } from "./services/auth";
import NotAuthorized from "./components/admin/util/NotAuthorized";

export const AdminApp = () => {
    const auth = new AuthHandler();
    // React.useEffect(() => {
    //     (async() => {
    //         const auth = new AuthHandler();

    //         if (auth.isAuthenticated()) {}
    //     })();
    // }, []);

    if (auth.isAuthenticated()) {
        return (
            <AppAdminFrame>
                <Outlet />
            </AppAdminFrame>
        );
    } else {
        return (<NotAuthorized />);
    }
};

export default AdminApp;
