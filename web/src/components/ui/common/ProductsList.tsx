import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import { ProductItem } from "@mysticcase/types";

import Product from "./Product";

import styles from "@styles/ui/common/productslist.module.scss";

interface ProductsListProps {
    className?: string;
    products: Array<ProductItem>;
}

export const ProductsList = ({ products }: ProductsListProps) => (
    <Box className={styles["mc-products-list-container"]}>
        <Grid className={styles["mc-products-list-grid-container"]} container disableEqualOverflow columnSpacing={5}>
            {products.map((item, idx) => (
                <Grid key={`key-product-${idx}`} xs={6} style={{ maxWidth: 886 }}>
                    <Product {...item} delayIdx={idx} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default ProductsList;
