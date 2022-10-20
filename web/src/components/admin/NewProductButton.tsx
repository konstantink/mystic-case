import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


const NEW_PRODUCT_URL = "/admin/product";

interface NewProductButtonProps {
    onClick: (e?: React.FormEvent) => void;
}

export default ({ onClick }: NewProductButtonProps) => {
    const navigate = useNavigate();

    return (
        <Box component="div" sx={{display: "block", width: "100%"}}>
            <Button size="small" variant="outlined" onClick={() => navigate(NEW_PRODUCT_URL)}>Add product</Button>
        </Box>
    )
}