// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { axiosInstance } from "./api";
import { AuthParams, AuthResponse, FailureResponse } from "../types";

export const tryLogin = async (params: AuthParams): Promise<AuthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post("/u/signin", {
        ...params,
    });

    return response.data;
};

export const tryLogout = async (): Promise<{success: true}| FailureResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post("/u/signout");

    return response.data;
};

export const tryRefreshToken = async (params: {refresh_token: string}): Promise<AuthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.post("/token/refresh", {
        ...params,
    });

    return response.data;
};

export const checkUser = async () => {
    const instance = await axiosInstance;

    const response = await instance.get("/u/whoami");

    return response.data;
};

export const createAccount = async (params: AuthParams) => {
    const instance = await axiosInstance;

    const response = await instance.post("/u/signup", {
        params,
    });

    return response.data;
};
