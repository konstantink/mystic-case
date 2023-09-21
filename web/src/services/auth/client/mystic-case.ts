import * as authApi from "@mysticcase/api/auth";
import { User } from "@mysticcase/types";
import { ClientStorage, CookieStorageHelper, StorageHelper } from "@mysticcase/services/storage";

export class MysticCaseClient {
    private readonly cookieStorage: ClientStorage;
    private readonly storageHelper: StorageHelper;

    constructor () {
        this.cookieStorage = new CookieStorageHelper();
        this.storageHelper = new StorageHelper();
    }

    // public getUser = async <TUser extends User>(): Promise<TUser | undefined> => {
    //     const user = this.storageHelper.getObject("mystic_case.auth.user", false);
    //     if (!user) {
    //         this.getTokenSilently(true);
    //     }
    //     return user;
    // };

    public checkSession = async () => {
        if (!this.cookieStorage.get<string>("mystic_case.auth.access_token")) {
            return;
        }
        try {
            this.getTokenSilently(true);
        } catch (_) {}
    };

    public getTokenSilently = async (forceRefresh: boolean): Promise<undefined | string> => {
        let token = this.cookieStorage.get<string>("mystic_case.auth.access_token");

        if (forceRefresh || !token) {
            try {
                const refreshToken = this.storageHelper.getString("mystic_case.auth.refresh_token");
                const authResponse = await authApi.tryRefreshToken({ refresh_token: refreshToken });
                if (authResponse.success) {
                    token = authResponse.access_token;
                    this.cookieStorage.save("mystic_case.auth.access_token", token);
                    this.storageHelper.set("mystic_case.auth.refresh_token", authResponse.refresh_token);
                }
            } catch (exc) {
                console.log(exc);
            }
        }

        return token;
    };
}
