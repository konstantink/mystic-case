import * as React from "react";

import Box from "@mui/material/Box";

import * as api from "../../api/api";
import NewProductButton from "../../components/admin/NewProductButton";
import ProductsTable from "../../components/admin/ProductsTable";
import { ProductItem } from "../../types";

const Products = () => {
    const [products, setProducts] = React.useState<Array<ProductItem>>([]);
    // const [open, openNewProductModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async () => {
            // fetch products from api
            try {
                const data = await api.getProducts();
                setProducts(data.products);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <Box sx={{ padding: "16px 24px", width: "100%" }}>
            <NewProductButton />
            <ProductsTable products={products} />
            {/* {products.map((item, idx) => (
                <div key={idx}>{item}</div>
            ))} */}

        </Box>
    );
};

export default Products;
