import * as React from "react";

import Box from "@mui/material/Box";

import { Header } from "../HomeLayout";
import Loading from "../../icons/Loading";
import { ProductItem } from "../../types";

interface ShopLayoutProps {
    products: Array<ProductItem>;
}

const ShopLayout = ({ products }: ShopLayoutProps) => {
    console.log("Products", products);
    return (
        <Box component="div" sx={{ background: "#FEFEFE", color: "#3A3185" }}>
            <Header invert />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 32, width: "100%" }}>
                <Loading />
            </div>
        </Box>
    );
};

export default ShopLayout;
