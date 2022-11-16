import * as React from "react";
import { Navigate, RouteObject } from "react-router-dom";

import AdminApp from "./AdminApp";
import * as mcApi from "./api/api";
import Home from "./containers/Home";
import Shop from "./containers/Shop";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Product from "./containers/admin/Product";
import Products from "./containers/admin/Products";

export type RouteType = {
    path: string,
    component: React.ComponentType,
    name?: string,
};

export const adminRoutes: Array<RouteObject> = [{
    index: true,
    element: <Navigate to="products" />
}, {
    path: "products",
    element: <Products />,
}, {
    path: "product",
    element: <Product />,
    children: [{
        path: ":productId",
        element: <Product />,
        //loader: mcApi.getProductLoader
    }]
},];

export const routes: Array<RouteObject> = [{
    path: "/signin",
    element: <SignIn />,
}, {
    path: "/signup",
    element: <SignUp />,
}, {
    path: '/',
    element: <Home />,
}, {
    path: '/shop',
    element: <Shop />,
}, {
    path: '/admin',
    element: <AdminApp />,
    children: adminRoutes
}];

// export default [
//     ...mainRoutes,
//     ...adminRoutes,
// ] as RouteType[];

