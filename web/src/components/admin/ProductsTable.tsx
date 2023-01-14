import * as React from "react";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Price, ProductItem } from "../../types";
import { NavLink } from "react-router-dom";

const ProductTableRow = (props: ProductItem) => {
    const { prices } = props;
    let priceToShow = "";
    if (prices && prices.length > 0) {
        const sortedPrices = prices.sort((r: Price, l: Price) => (r.price as number) - (l.price as number));
        priceToShow = ((sortedPrices[0]
            .price as number) / 100.0)
            .toLocaleString("en-GB", { currency: "GBP", currencyDisplay: "symbol", style: "currency" });
        if (prices.length > 1) {
            priceToShow = `from ${priceToShow}`;
        }
    }
    return (
        <TableRow>
            <TableCell align="center" sx={{ fontFamily: "inherit" }}><img alt={props.name} src="/url" /></TableCell>
            <TableCell align="left" sx={{ fontFamily: "inherit" }}>
                <NavLink to={`/admin/product/${props.id}`}>
                    <Box component="div" height="100%" padding="8px" width="100%" sx={{ background: "rgba(0,0,0,0.03)" }}>
                        {props.name}
                    </Box>
                </NavLink>
            </TableCell>
            <TableCell align="left" sx={{ fontFamily: "inherit" }}>{props.description}</TableCell>
            <TableCell align="left" sx={{ fontFamily: "inherit" }}><Switch checked={props.isFeatured} /></TableCell>
            <TableCell align="right" sx={{ fontFamily: "inherit" }}>{priceToShow || ""}</TableCell>
        </TableRow>
    );
};

export default ({ products }: {products: Array<ProductItem>}) => {
    return (
        <Box
            sx={{
                width: "100%",
                "&:not(:first-of-type)": {
                    marginTop: 2,
                },
            }}
        >
            <Table
                size="small"
                sx={{
                    width: "100%",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontFamily: "inherit", width: 100 }}>Thumbnail</TableCell>
                        <TableCell align="center" sx={{ fontFamily: "inherit", width: 150 }}>Name</TableCell>
                        <TableCell align="center" sx={{ fontFamily: "inherit" }}>Description</TableCell>
                        <TableCell align="left" sx={{ fontFamily: "inherit", width: 100 }}>Is Live</TableCell>
                        <TableCell align="right" sx={{ fontFamily: "inherit", width: 150 }}>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length > 0
                        ? (
                            products.map((item: ProductItem, idx: number) => (
                                <ProductTableRow key={`id-product-row-${idx}`} {...item} />
                            )))
                        : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    sx={{
                                        color: "rgba(0,0,0,.35)",
                                        fontFamily: "inherit",
                                        textAlign: "center",
                                        width: "100%",
                                    }}>No products added so far</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </Box>
    );
};
