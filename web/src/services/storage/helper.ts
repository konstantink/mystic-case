import * as Cookies from "es-cookie";

export type StorageType = "localStorage" | "sessionStorage";
export type StoredValueType = "string" | "number" | "boolean" | "object";

type CookieStorageOptions = {
    daysUntilExpire?: number;
    cookieDomain?: string;
}

export type ClientStorage = {
    get<T>(key: string): T | undefined;
    save(key: string, value: any, options?: CookieStorageOptions): void;
    remove(key: string, options?: CookieStorageOptions): void;
}

export class StorageHelper {
    private storage: Storage;

    constructor (storageType: StorageType = "localStorage") {
        this.storage = storageType === "localStorage" ? window.localStorage : window.sessionStorage;
    }

    public set = (key: string, value: any) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem#exceptions
        try {
            const val: string = typeof value === "object" ? JSON.stringify(value) : value.toString();
            this.storage.setItem(key, val);
            return val;
        } catch (e) {
            return null;
        }
    };

    public getString = (key: string, removeKey = true): string | null => {
        const value: string | null = this.get(key, "string");
        if (removeKey) {
            this.remove(key);
        }
        return value;
    };

    public getNumber = (key: string, removeKey = true): number | null => {
        const value: number | null = this.get(key, "number");
        if (removeKey) {
            this.remove(key);
        }
        return value;
    };

    public getBoolean = (key: string, removeKey = true): boolean | null => {
        const value: boolean | null = this.get(key, "boolean");
        if (removeKey) {
            this.remove(key);
        }
        return value;
    };

    public getObject = (key: string, removeKey = true): object | null => {
        const value: object | null = this.get(key, "object");
        if (removeKey) {
            this.remove(key);
        }
        return value;
    };

    public remove = (key: string): void => {
        this.storage.removeItem(key);
    };

    private get = (key: string, type: StoredValueType) => {
        const value = this.storage.getItem(key);

        if (value === null) {
            return value;
        }

        switch (type) {
        case "number":
            return parseFloat(value);
        case "boolean":
            return value === "true" || value === "1";
        case "object":
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(e);
                return null;
            }
        default:
            return value;
        }
    };
}

export class CookieStorageHelper {
    public get = <T>(key: string) => {
        const value = Cookies.get(key);

        if (typeof value === "undefined") {
            return;
        }

        return <T>JSON.parse(value);
    };

    public save = (key: string, value: any, options?: CookieStorageOptions): void => {
        let cookieAttributes: Cookies.CookieAttributes = {};

        if (window.location.protocol === "https") {
            cookieAttributes = {
                secure: true,
                sameSite: "none",
            };
        }

        if (options?.daysUntilExpire) {
            cookieAttributes.expires = options.daysUntilExpire;
        }

        if (options?.cookieDomain) {
            cookieAttributes.domain = options.cookieDomain;
        }

        Cookies.set(key, JSON.stringify(value), cookieAttributes);
    };

    public remove = (key: string, options?: CookieStorageOptions): void => {
        const cookieAttributes: Cookies.CookieAttributes = {};

        if (options?.cookieDomain) {
            cookieAttributes.domain = options.cookieDomain;
        }

        Cookies.remove(key, cookieAttributes);
    };
}
