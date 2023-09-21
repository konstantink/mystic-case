import type { AxiosResponse } from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode"; // eslint-disable-line
import * as React from "react";
import { useQuery } from "react-query";

import * as authApi from "../api/auth";
import { FailureResponse } from "../types";

interface User {
    username?: string;
    password?: string;
    authenticated?: boolean;
}

export interface AuthContextType {
    user: User;
    loading: boolean;
    error?: AxiosResponse<FailureResponse> | null;
    login: (username: string, password: string) => void
    signUp: (username: string, email: string, password: string) => void;
    logout: () => void;
}

export interface Payload extends JwtPayload {
    admin?: boolean;
    authorized?: boolean;
    name?: string;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
    const [user, setUser] = React.useState<User>({} as User);
    // let user: User;
    const [error] = React.useState<AxiosResponse<FailureResponse> | null>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const data = useQuery("user", authApi.checkUser, { retry: false });
    console.log("Data", data);

    React.useEffect(() => {
        const at = localStorage.getItem("at");
        if (at !== null) {
            const claims = jwt_decode<Payload>(at);
            console.log(claims);
            setUser({ username: claims.name, authenticated: !!claims.exp && (claims.exp > (new Date().getTime() / 1000)) });
            // user = { username: claims.name, authenticated: !!claims.exp && (claims.exp > (new Date().getTime() / 1000)) };
            // const response = await authApi.checkUser();
            // const data = useQuery("user", authApi.checkUser, { retry: false });
            // console.log("Data", data);
            // if (data.success) {
            //     setUser({ username: data.user.username, authorized: true });
            // }
        } else {
            // const response = useQuery("anonymousToken", authApi.getAnonymousToken);
        }
        // const user = localStorage.getItem("user_id");
        // if (user === null) {
        //     const response = await authApi.checkUser();
        //     console.log(response);
        // }
        // const user = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : {};
        // const response = await authApi.checkUser(user);
        // localStorage.setItem("user", JSON.stringify(response.user))
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);

        try {
            const response = await authApi.tryLogin({ username, password });
            if (response.success) {
                setUser({ username, password, authenticated: true });
                const claims = jwt_decode<Payload>(response.access_token);
                localStorage.setItem("at", response.access_token);
                localStorage.setItem("rt", response.refresh_token);
                localStorage.setItem("user_id", claims.sub || "");
                localStorage.setItem("isAdmin", JSON.stringify(claims.admin));
            } else {
                console.log("Authorization failed");
            }
        } catch (exc) {
            console.log("Exception:", exc);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (username: string, email: string, password: string) => {
        console.log("Sign Up", username, password, email);
    };

    const logout = async () => {
        try {
            const response = await authApi.tryLogout();
            if (response.success) {
                setUser({} as User);
            }
        } catch (exc) {
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
    );
};

export const useAuth = (): AuthContextType => {
    return React.useContext(AuthContext);
};
