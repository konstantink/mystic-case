import * as React from "react";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import { ProductItem } from "../../types";


const ProductTableRow = (props: ProductItem) => {
    return (
        <TableRow>
            <TableCell align="center"><img alt={props.name} src="/url" /></TableCell>
            <TableCell align="left">{props.name}</TableCell>
            <TableCell align="left"><Switch checked={props.isFeatured} /></TableCell>
            <TableCell align="right">{props.prices?.length}</TableCell>
        </TableRow>
    )
}

export default ({ products }: {products: Array<ProductItem>}) => {
    return (
        <Box 
            sx={{
                width: "100%",
                "&:not(:first-of-type)": {
                    marginTop: 2,
                }
            }}
        >
            <Table
                size="small"
                sx={{
                    fontFamily: "Pangram",
                    width: "100%",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{fontFamily: "Pangram", width: 100}}>Thumbnail</TableCell>
                        <TableCell align="center" sx={{fontFamily: "Pangram"}}>Name</TableCell>
                        <TableCell align="left" sx={{fontFamily: "Pangram", width: 100}}>Is Live</TableCell>
                        <TableCell align="right" sx={{fontFamily: "Pangram", width: 150}}>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length > 0 ? (
                        products.map((item: ProductItem, idx: number) => (
                            <ProductTableRow key={`id-product-row-${idx}`} {...item} />
                        ))) : (
                            <TableRow>
                                <TableCell colSpan={4}>No products added so far</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </Box>
    )
};
