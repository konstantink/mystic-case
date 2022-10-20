import * as React from "react";
import { Navigate, Route, RouteProps} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const AdminRoute = (props: RouteProps) => {
    const { user } = useAuth();

    return (
        user ? <Route {...props} /> : <Navigate to="/admin/signin" />
    )
};

export default AdminRoute;