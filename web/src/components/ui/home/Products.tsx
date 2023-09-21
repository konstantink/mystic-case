import * as React from "react";
import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getFeaturedProducts } from "@mysticcase/api/api";
import { ProductItem } from "@mysticcase/types";
import { ButtonLink, ProductsList } from "@mysticcase/ui/common";

import styles from "@styles/ui/home.module.scss";

const sortFeaturedProducts = (left: ProductItem, right: ProductItem) => {
    if (left.isNew && !right.isNew) {
        return -1;
    } else if (!left.isNew && right.isNew) {
        return 1;
    } else if (left.isBestseller && !right.isBestseller) {
        return -1;
    } else if (!left.isBestseller && right.isBestseller) {
        return 1;
    } else if (left.isFeatured && !right.isFeatured) {
        return -1;
    } else if (!left.isFeatured && right.isFeatured) {
        return 1;
    } else {
        return 0;
    }
};

export const Products = () => {
    const { data } = useQuery("featured_products", getFeaturedProducts, { retry: false });

    return (
        <Box className={styles["mc-products-container"]} component="div">
            <Typography className={styles["mc-products-h2"]} variant="h2">
                Choose your box
            </Typography>
            <ProductsList products={data ? data.products.sort(sortFeaturedProducts) : []} />
            <div style={{ width: "100%" }}>
                <div style={{ border: "2px solid #938CD1", borderRadius: 4, margin: "0 0 80px 0" }}></div>
            </div>
            <Typography variant="h2" style={{ color: "#231E52", fontFamily: "Pangram", fontSize: 56, fontWeight: "bold", lineHeight: "64px", letterSpacing: "0.4px", marginBottom: 40, maxWidth: 705, textAlign: "center", textTransform: "capitalize" }}>
                Want to see more? Check out our shop page
            </Typography>
            <ButtonLink to="/shop">
                Choose a box
            </ButtonLink>
        </Box>
    );
};

export default Products;
