import * as React from "react";

import {
    AuthHandler,
    AuthHandlerEventType,
    InitAuthHandlerEvent
} from "@mysticcase/services/auth";

interface User {
    username: string;
    email: string;
}

type AuthProviderProps = React.PropsWithChildren<object>;

interface AuthContextType {
    isReady: boolean;
    user?: User;

    login(username: string, password: string, redirectToURI?: string): Promise<void>;
    logout(redirectToURI?: string): Promise<void>;

    getUser(): Promise<User | undefined>;
    getToken(forceTokenRefresh?: boolean): Promise<string>;

    resetPassword(): Promise<boolean>;
}

interface AuthStateType {
    user?: User;
    token?: string;
}

interface ActionType {
    user?: User;
    token?: string;
}

type ReducerType = React.Reducer<AuthStateType, ActionType>;

const authStateReducer = (state: AuthStateType, action: ActionType) => {
    const s: AuthStateType = {
        user: action.user || state.user,
        token: action.token || state.token,
    };
    return s;
};

const AuthContext = React.createContext<AuthContextType>({
    isReady: false,
} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [auth, setAuth] = React.useState<AuthHandler>();
    const [{ user, token }, setAuthState] = React.useReducer<ReducerType>(authStateReducer, {});

    const onInit = React.useCallback(async ({ detail }: InitAuthHandlerEvent) => {
        if (detail?.authHandler) {
            const ah = detail.authHandler;
            auth.removeEventListener(AuthHandlerEventType.INIT, onInit);
            auth.removeEventListener(AuthHandlerEventType.INIT_FAILED, onInitFailed);
            const token = await ah.getToken();
            const user = await ah.getUser();
            setAuthState({ user, token });
        }
    }, []);

    const onInitFailed = React.useCallback(({ detail }: InitAuthHandlerEvent) => {
        if (detail?.authHandler) {
            const ah = detail.authHandler;
            ah.removeEventListener(AuthHandlerEventType.INIT, onInit);
            ah.removeEventListener(AuthHandlerEventType.INIT_FAILED, onInitFailed);
        }
    }, []);

    React.useEffect(() => {
        const ah = new AuthHandler();
        ah.addEventListener(AuthHandlerEventType.INIT, onInit);
        ah.addEventListener(AuthHandlerEventType.INIT_FAILED, onInitFailed);
        setAuth(ah);
    }, []);

    const memoedValues: AuthContextType = React.useMemo(
        () => ({
            isReady: true,
            user,
            token,
            login: auth.login,
            logout: auth.logout,
            getUser: auth.getUser,
            getToken: auth.getToken,
            resetPassword: auth.resetPassword,
        }),
        [user, auth]
    );

    return (
        <AuthContext.Provider value={memoedValues}>
            {children}
        </AuthContext.Provider>
    );
};
