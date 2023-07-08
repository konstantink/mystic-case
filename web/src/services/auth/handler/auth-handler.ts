import * as authApi from "@mysticcase/api/auth";
import { StorageHelper } from "@mysticcase/storage-helper";
import { User } from "@mysticcase/types";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { MysticCaseClient } from "@mysticcase/services/auth";

export enum AuthHandlerEventType {
    INIT = "onInit",
    INIT_FAILED = "onInitFailed",
    USER_UPDATED = "onUserUpdated",
    TOKEN_UPDATED = "onTokenUpdated",
    ERROR = "onError",
}

export interface InitAuthHandlerEvent extends CustomEvent {
    detail: {
        authHandler: AuthHandler;
    };
}

interface DispatchEventMethod {
    (type: AuthHandlerEventType.INIT, value: AuthHandler): void;
    (type: AuthHandlerEventType.INIT_FAILED, value: AuthHandler): void;
    (type: AuthHandlerEventType.USER_UPDATED, value: User): void;
    (type: AuthHandlerEventType.TOKEN_UPDATED, value: string): void;
}

export class AuthHandler {
    private readonly isReady: Promise<boolean>;
    private readonly delegate: DocumentFragment = document.createDocumentFragment();
    private readonly authClient = new MysticCaseClient();
    private initTimeout?: number;
    private readonly storageHelper = new StorageHelper("sessionStorage");

    constructor () {
        this.isReady = new Promise<boolean>((resolve, reject) => {
            (async () => {
                try {
                    this.initTimeout = window.setTimeout(() => {
                        this.dispatchEvent(AuthHandlerEventType.INIT_FAILED, this);
                        this.triggerLifecycleHook(AuthHandlerEventType.INIT_FAILED);
                        throw new Error("AuthHandler timed out");
                    }, 5 * 1000);

                    await authApi.checkToken();
                    clearInterval(this.initTimeout);
                    resolve(true);
                } catch (err) {
                    reject(err);
                    console.log((err as Error).message);
                }
            })();
        });
    }

    private dispatchEvent = (event: AuthHandlerEventType, value: any) => {
        console.log("dispatchEvent");
    };

    private triggerLifecycleHook = (event: AuthHandlerEventType) => {
        console.log("triggerLifecycleHook");
    };

    public addEventListener = (event: AuthHandlerEventType, value: any) => {
        this.delegate.addEventListener(event, value);
    };

    public removeEventListener = (event: AuthHandlerEventType, value: any) => {
        this.delegate.removeEventListener(event, value);
    };

    public login = async (username: string, password: string, redirectToURI?: string) => {
        await this.isReady;

        const response = await authApi.tryLogin({ username, password });

        if (response.success) {
            window.location.href = `${window.location.origin}/${redirectToURI}`;
        } else {
            console.log("Something happened with login");
        }
    };

    public logout = async (redirectToURI?: string) => {
        console.log("logout");
        // return new Promise(() => setTimeout(() => { console.log("Hello"); return void; }, 500));
        return Promise.resolve();
    };

    public resetPassword = async () => {
        console.log("resetPassword");
        return Promise.resolve(true);
    };

    public getUser = async () => {
        console.log("getUser");
        // this.storageHelper.getObject("user");
        // const user = this.authClient.getUser();
        // return Promise.resolve({ username: "name", email: "name@example.org" } as User);
    };

    public getToken = async (forceRefreshToken = false) => {
        console.log("getToken");
        const token = await this.authClient.getTokenSilently(forceRefreshToken);
        // this.saveIdTokenToCache(token);
        // const claims = jwtDecode<JwtPayload>(token);
        return token;
    };

    public isAuthenticated = async () => {
        let user = this.getUser();

        if (!user) {
            await this.getToken();
            user = this.getUser();
            if (!user) {
                return false;
            }
        }

        return true;
    };
}
