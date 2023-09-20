import * as React from "react";

import Box from "@mui/material/Box";

import styles from "@styles/ui/icons/label.module.scss";

export const BestSellerLabel = () => (
    <Box className={styles["mc-label-bestseller-container"]}>
        <span className={styles["mc-label-bestseller-text"]}>Best seller</span>
    </Box>
);

export default BestSellerLabel;
