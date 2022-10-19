import * as React from "react";

import Box from "@mui/material/Box";

import ProductForm from "../../components/admin/ProductForm";


export default () => {
    return (
        <Box
            sx={{
                padding: "24px 128px",
                width: "100%"
            }}
        >
            <ProductForm />
        </Box>
    )
};