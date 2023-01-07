import axios, { AxiosInstance, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import * as uuid from "uuid";

import { tryRefreshToken } from "./auth";
import { 
    FeaturedProductsResponse,
    ProductResponse,
    ProductItem,
    ProductsResponse,
    TokenHealthResponse,
    UploadResponse
} from "../types";

interface AxiosInstanceParams {
    version?: string,
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
        if (accessToken) {
            Object.assign(config.headers!, {
                Authorization: `Bearer ${accessToken}`,
            });
        }
        Object.assign(config.headers!, {
            [SESSION_ID_HEADER]: getSessionID(),
            [REQUEST_ID_HEADER]: getRequestID(),
        })

        return config;
    })

    instance.interceptors.response.use((response) => response, async (error: any) => {
        console.log(error.response);
        if (error.response.status === 401 && (error.config._retry || error.config.url === "/token/refresh")) {
            return Promise.reject(error);
        }
        switch (error.response.status) {
            case 401:
                const refreshToken = localStorage.getItem("rt") || "";
                error.config._retry = true;
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
                return Promise.reject(error);
            case 400:
                return Promise.resolve(error.response);
            default:
                return Promise.reject(error);
        }
    })

    return instance
}

export const axiosInstance = getInstance({});

export const checkToken = async (): Promise<TokenHealthResponse> => {
    const instance = await axiosInstance;

    const response = await instance.get<TokenHealthResponse>("/token/health");

    return response.data;
};

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

export const getProductLoader = async ({ params }: any) => {
    const product = await getProduct(params.productId);
    return product;
}

export const getProduct = async (productId: string): Promise<ProductResponse> => {
    const instance = await axiosInstance;

    const response = await instance.get<ProductResponse>(`/admin/product/${productId}`);

    return response.data;
}

const omitUndefined = (dict: any): any => {
    return Object.fromEntries(Object.entries(dict).filter(item => item[1] !== undefined))
}

export const createProduct = async (product: ProductItem): Promise<ProductResponse> => {
    const instance = await axiosInstance;

    try {
        const response = await instance.post<ProductResponse>("/admin/product", omitUndefined(product))
        return response.data;
    } catch (err) {
        console.log(err);
        return Promise.reject({success: false, errors: {__all__: (err as Error).message}});
    }
}

export const updateProduct = async (product: ProductItem): Promise<ProductResponse> => {
    const instance = await axiosInstance;

    try {
        const response = await instance.patch<ProductResponse>(`/admin/product/${product.id}`, product);
        return response.data;
    } catch (err) {
        return Promise.reject({success: false, errors: {__all__: (err as Error).message}});
    }
}

export const uploadFile = async (file: File, uploadCb: (progress: AxiosProgressEvent) => void): Promise<UploadResponse> => {
    const instance = await axiosInstance;
    const formData = new FormData();
    if (file) {
        formData.append("file", file);
    }
    try {
        const response = await instance.post<UploadResponse>("/admin/gallery/upload", formData, { onUploadProgress: uploadCb})
        return response.data;
    } catch(err) {
        console.log(err);
        return Promise.reject({success: false, errors: {__all__: (err as Error).message}});
    }
}
