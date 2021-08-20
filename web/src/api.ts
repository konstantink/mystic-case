import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as uuid from "uuid";

import { FeaturedProductsResponse, ProductItem } from "./types";

interface AxiosInstanceParams {
    version?: string,
}

export interface AuthParams {
    email: string,
    password: string,
}

interface AuthResponse {

}

const SESSION_ID_HEADER = "X-Mystic-Case-Session-Id";
const REQUEST_ID_HEADER = "X-Mystic-Case-Request-Id";

const SESSION_ID = String(uuid.v1());

const getSessionID = () => SESSION_ID;
const getRequestID = () => String(uuid.v1());

const getInstance = async (params: AxiosInstanceParams): Promise<AxiosInstance> => {
    const version = params.version ? params.version : 'v1';
    const instance = axios.create({
        baseURL: `http://127.0.0.1:8085/api/${version}`,
        timeout: 1000,
        withCredentials: false
    })

    instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        Object.assign(config.headers.common, {
            [SESSION_ID_HEADER]: getSessionID(),
            [REQUEST_ID_HEADER]: getRequestID(),
        })

        return config;
    })

    return instance
}

const axiosInstance = getInstance({});

export const tryLogin = async (params: AuthParams): Promise<AuthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post('/u/signin', {
        params: params
    })

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