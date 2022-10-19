import * as React from "react";

import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Header } from "../HomeLayout";
import Loading from "../../icons/Loading";
import { ProductItem } from "../../types";


interface ShopLayoutProps {
    products: Array<ProductItem>;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: "#FEFEFE",
        color: "#3A3185",
    },
}));

const ShopLayout = ({ products }: ShopLayoutProps) => {
    const classes = useStyles();

    return (
        <Box component="div" className={classes.root}>
            <Header invert />
            <div style={{display: "flex", justifyContent: "center", marginTop: 32, width: "100%"}}>
                <Loading />
            </div>
        </Box>
    );
}

export default ShopLayout;