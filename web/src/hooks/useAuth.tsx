import type { AxiosResponse } from "axios";
import { RouterState } from "connected-react-router";
import jwt_decode, { JwtPayload } from "jwt-decode";
import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as authApi from "../api/auth";
import { FailureResponse } from "../types";

interface User {
    username: string;
    password: string;
}

export interface AuthContextType {
    user: User;
    loading: boolean;
    error?: AxiosResponse<any> | null;
    login: (username: string, password: string) => void
    signUp: (username: string, email: string, password: string) => void;
    logout: () => void;
};

export interface Payload extends JwtPayload {
    admin?: boolean;
    authorized?: boolean;
    name?: string;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children }: React.PropsWithChildren<any>): JSX.Element => {
    const [user, setUser] = React.useState<User>({} as User);
    const [error, setError] = React.useState<AxiosResponse<FailureResponse> | null>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const history = useHistory();
    const rstate = useSelector<{router: RouterState<{location: {pathname: string}}>}, {pathname: string}>(state => state.router.location);
    // const location = useLocation();
    console.log(rstate);

    React.useEffect(() => {
        if (error) setError(null);
    }, [rstate.pathname])

    React.useEffect(() => {
        (async () => {
            try {
                const user = localStorage.getItem("user");
                if (user === null) {
                    const response = await authApi.checkUser();
                    console.log(response);
                }
                // const user = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : {};
                // const response = await authApi.checkUser(user);
                // localStorage.setItem("user", JSON.stringify(response.user))
            } catch (exc) {
                console.log("failed to retrieve user info");
            }
        })()
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);

        try {
            const response = await authApi.tryLogin({username, password});
            setUser({username, password})
            if (response.success){
                const claims = jwt_decode<Payload>(response.access_token);
                localStorage.setItem("at", response.access_token);
                localStorage.setItem("rt", response.refresh_token);
                localStorage.setItem("user_id", claims.sub || "");
                localStorage.setItem("isAdmin", JSON.stringify(claims.admin));
            }
        } catch (exc) {
            console.log(exc);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async(username: string, email: string, password: string) => {

    };

    const logout = async() => {
        try {
            const response = await authApi.tryLogout()
            if (response.success) {
                setUser({} as User);
            }
        } catch(exc) {
            console.log("logout failed", exc);
        }
    };

    const memoedValues: AuthContextType = React.useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signUp,
            logout,
        }),
        [user, loading, error]
    );
    
    return (
        <AuthContext.Provider value={memoedValues}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType => {
    return React.useContext(AuthContext);
};