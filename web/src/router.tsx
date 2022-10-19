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

export const routes: RouteType[] = [{
    path: "/signin",
    component: SignIn,
}, {
    path: "/signup",
    component: SignUp,
}, {
    path: '/',
    component: Home,
}, {
    path: '/shop',
    component: Shop,
}]

export const adminRoutes: Array<RouteType> = [{
    path: "/products",
    name: "Products",
    component: Products,
}, {
    path: "/product",
    // name: "Create a product",
    component: Product,
}, ];

// export default [
//     ...mainRoutes,
//     ...adminRoutes,
// ] as RouteType[];

