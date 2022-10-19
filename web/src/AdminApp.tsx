import * as React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import AppAdminFrame from "./containers/admin/AppAdminFrame"
import AdminRoute from "./containers/admin/AdminRoute";
import { adminRoutes } from "./routes";


const AdminApp = () => {
    const { path, url } = useRouteMatch();

    return (
        <AppAdminFrame>
            <Switch>
                {adminRoutes.map((route, idx) => {
                    console.log(`${path}${route.path}`)
                    return (
                        <AdminRoute key={`admin-route-idx-${idx}`} exact path={`${path}${route.path}`} component={route.component} />
                    )
                })}
            </Switch>
        </AppAdminFrame>
    )
};

export default AdminApp;