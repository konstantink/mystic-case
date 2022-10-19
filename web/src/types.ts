export type ProductImage = {
    id: string,
    url: string,
    name: string,
    order?: number;
}

export type ProductItem = {
    id?: string | undefined,
    name?: string,
    slug?: string,
    title?: string,
    description?: string,
    // price: number | string,
    // currency: string,
    prices: Array<Price>,
    difficulty?: number,
    isFeatured?: boolean,
    isNew?: boolean,
    isBestseller?: boolean,
    images: Array<ProductImage>,
    hasVariants?: boolean;
    variants?: Array<OptionType>,
}

export type Price ={
    price: number | string,
    currency: string,
    type: number,
    interval?: Interval,
}

export type IntervalOption = "month" | "week" | "day" | "custom";

export type Interval = {
    interval: IntervalOption,
    intervalCount: number,
}

export type OptionType = {
    name: string,
    values: Array<OptionValueType>,
}

export type OptionValueType = {
    overridePrice: boolean,
    price: string,
    value: string,
}

export type ProgressActionType = "progress" | "clear_progress" | "load" | "error";
export type ProgressStatus = "pending" | "done" | "error";
export type ProgressAction = {
    type: ProgressActionType,
    fileName: string,
    status: ProgressStatus,
    progress: number,
}

export type ProgressState = {
    [key: string]: {
        status: ProgressStatus,
        progress: number,
    }
};
export type ProgressReducer = (s: ProgressState, a: ProgressAction) => ProgressState;

export interface FailureResponse {
    success: false;
    error: string;
};

export interface AuthParams {
    username: string,
    password: string,
}

export type AuthResponse = {
    success: true;
    access_token: string;
    refresh_token: string;
 } | FailureResponse;


export interface FeaturedProductsResponse {
    products: Array<ProductItem>;
}

export interface ProductsResponse {
    products: Array<ProductItem>;
}

export type ProductSuccessResponse = {
    success: true;
    product: ProductItem;
}

export type ProductFailiureResponse = {
    success: false;
    errors: ProductItem;
}

export type ProductResponse = ProductFailiureResponse | ProductFailiureResponse;

export type UploadSuccessResponse = {
    success: true;
}

export type UploadFailureResponse = {
    success: false;
    errors: Array<string>;
}

export type UploadResponse = UploadSuccessResponse | UploadFailureResponse;

export type TokenHealthResponse = UploadSuccessResponse;
