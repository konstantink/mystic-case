import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as uuid from "uuid";

import { FeaturedProductsResponse, ProductsResponse } from "./types";

interface AxiosInstanceParams {
    version?: string,
}

export interface AuthParams {
    username: string,
    password: string,
}

type AuthResponse = {
    success: true;
    access_token: string;
    refresh_token: string;
 } | {
    success: false,
    error: string;
}

const SESSION_ID_HEADER = "X-Mystic-Case-Session-Id";
const REQUEST_ID_HEADER = "X-Mystic-Case-Request-Id";

const SESSION_ID = String(uuid.v1());

const getSessionID = () => SESSION_ID;
const getRequestID = () => String(uuid.v1());

const getInstance = async (params: AxiosInstanceParams): Promise<AxiosInstance> => {
    const version = params.version ? params.version : 'v1';
    const instance = axios.create({
        baseURL: `http://mysticcase.io:8085/api/${version}`,
        timeout: 1000,
        withCredentials: true
    })

    instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        const accessToken = localStorage.getItem("at") || "";
        Object.assign(config.headers.common, {
            [SESSION_ID_HEADER]: getSessionID(),
            [REQUEST_ID_HEADER]: getRequestID(),
            Authorization: `Bearer ${accessToken}`,
        })

        return config;
    })

    instance.interceptors.response.use((response) => response, async (error: any) => {
        console.log(error.response);
        if (error.response.status === 401 && error.config.url === "/token/refresh") {
            return Promise.reject(error);
        }
        if (error.response.status === 401) {
            const refreshToken = localStorage.getItem("rt") || "";
            if (refreshToken) {
                const response = await tryRefreshToken({ refresh_token: refreshToken });
                if (response.success) {
                    localStorage.setItem("at", response.access_token);
                    localStorage.setItem("rt", response.refresh_token);
                    const instance = await getInstance({});
                    Object.assign(error.config.headers, {
                        Authorization: `Bearer ${response.access_token}`,
                    });
                    return instance(error.config);
                    // return axios(error.config);
                }
            }
        }
    })

    return instance
}

const axiosInstance = getInstance({});

export const tryLogin = async (params: AuthParams): Promise<AuthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post('/u/signin', {
        ...params
    })

    return response.data;
}

export const tryRefreshToken = async (params: {refresh_token: string}): Promise<AuthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post('/token/refresh', {
        ...params
    });

    return response.data;
}

export const createAccount = async (params: AuthParams) => {
    const instance = await axiosInstance;

    const response = await instance.post('/u/signup', {
        params: params,
    })

    return response.data;
}

export const getFeaturedProducts = async (): Promise<FeaturedProductsResponse> => {
    const instance = await axiosInstance;
    
    const response = await instance.get<FeaturedProductsResponse>('/products/featured');

    return response.data;
}

export const getProducts = async (): Promise<ProductsResponse> => {
    const instance = await axiosInstance;

    const response = await instance.get<ProductsResponse>("/admin/products");

    return response.data;
}
