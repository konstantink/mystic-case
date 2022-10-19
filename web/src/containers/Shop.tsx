import * as React from "react";

import * as api from "../api/api";
import ShopLayout from "../components/shop/ShopLayout";
import { ProductItem } from "../types";


const Shop = () => {
    const [products, setProducts] = React.useState<Array<ProductItem>>([]);

    React.useEffect(() => {
        (async () => {
            // fetch products from api
            const data = await api.getProducts();
            setProducts(data.products);
        })();
    }, []);

    return (
        <ShopLayout products={products} />
    );
}

export default Shop;