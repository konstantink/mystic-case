export type ProductImage = {
    id: number,
    url: string,
    name: string,
}

export type ProductItem = {
    id: number,
    name: string,
    description: string,
    price: number,
    currency: string,
    difficulty: number,
    isFeatured: boolean,
    isNew: boolean,
    isBestseller: boolean,
    images: Array<ProductImage>,
}

export interface FeaturedProductsResponse {
    products: Array<ProductItem>;
}