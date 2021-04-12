import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";

export type RouteType = {
    path: string,
    component: React.ComponentType
};

const mainRoutes: RouteType[] = [{
    path: '/',
    component: Home,
}]

const adminRoutes: RouteType[] = [{
    path: "/admin/signin",
    component: SignIn,
}, {
    path: "/admin/signup",
    component: SignUp,
}];

export default [
    ...mainRoutes,
    ...adminRoutes,
] as RouteType[];

