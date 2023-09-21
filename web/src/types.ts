export type DisplayIntervalOption = "month" | "week" | "day" | "year" | "custom";
export type IntervalOption = Omit<DisplayIntervalOption, "custom">;

export type OptionValueType = {
    overridePrice: boolean,
    price: string,
    value: string,
}

export type OptionType = {
    name: string,
    values: Array<OptionValueType>,
}

export type Interval = {
    displayInterval: DisplayIntervalOption
    interval: IntervalOption,
    intervalCount: number,
}

export enum PriceType {
    OneTime = 0,
    Recurring = 1,
}

export type ProductImage = {
    id: string,
    url: string,
    name: string,
    order?: number;
}

export type Price ={
    id?: string,
    active?: boolean,
    default?: boolean,
    price: number,
    currency: string,
    type: PriceType,
    interval?: Interval,
    value?: string,
}

export type ProductItem = {
    id?: string,
    name?: string,
    slug?: string,
    title?: string,
    description?: string,
    // price: number | string,
    // currency: string,
    prices?: Array<Price>,
    difficulty?: number,
    isFeatured?: boolean,
    isNew?: boolean,
    isBestseller?: boolean,
    images?: Array<ProductImage>,
    hasVariants?: boolean;
    variants?: Array<OptionType>,
    sku?: string;
}

export type Errors<Item> = {
    [key in keyof Item]: string;
}

export type Difference<T> = {
    updated: Array<T>,
    created: Array<T>,
    deleted: Array<T>
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
}

export interface User {
    username: string;
    email: string;
}

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
    errors: Errors<ProductItem>;
}

export type ProductResponse = ProductSuccessResponse | ProductFailiureResponse;

export type UploadSuccessResponse = {
    success: true;
    item: ProductImage;
}

export type UploadFailureResponse = {
    success: false;
    errors: Array<string>;
}

export type UploadResponse = UploadSuccessResponse | UploadFailureResponse;

export type TokenHealthResponse = UploadSuccessResponse;
