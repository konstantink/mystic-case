import * as React from "react";
import { Redirect, Route, RouteProps} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const AdminRoute = (props: RouteProps) => {
    const { user } = useAuth();

    return (
        user ? <Route {...props} /> : <Redirect to="/admin/signin" />
    )
};

export default AdminRoute;