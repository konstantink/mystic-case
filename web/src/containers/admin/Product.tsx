import * as React from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { getProduct } from "../../api/api";
import ProductForm from "../../components/admin/ProductForm";
import { Errors, ProductItem } from "../../types";

type ProductState = {
    product: ProductItem | undefined;
    loading: boolean;
    success: boolean;
    error: Errors<ProductItem> | undefined;
};

enum ProductActions {
    LoadingProduct = "@@product/loading",
    LoadingProductDone = "@@product/loading_done"
}

type ProductAction = {
    type: ProductActions;
    product?: ProductItem;
    success?: boolean;
    error?: Errors<ProductItem>;
};

type ProductReducer = (state: ProductState, action: ProductAction) => ProductState;

export default () => {
    const { productId } = useParams();
    const productReducer = (state: ProductState, action: ProductAction): ProductState => {
        switch (action.type) {
            case ProductActions.LoadingProduct:
                return {
                    ...state,
                    loading: true,
                    success: false,
                    product: undefined,
                    error: undefined
                }
            case ProductActions.LoadingProductDone:
                if (action.success) {
                    return {
                        ...state,
                        loading: false,
                        success: true,
                        product: action.product,
                        error: undefined
                    }
                }
                return {
                    ...state,
                    loading: false,
                    success: false,
                    product: undefined,
                    error: action.error
                }
            default:
                return state;
        }
    };

    const [state, dispatch] = React.useReducer<ProductReducer>(productReducer, {
        loading: false,
        success: false,
        product: undefined,
        error: undefined,
    });

    React.useEffect(() => {
        console.log(productId);
        if (productId) {
            (async () => {
                dispatch({ type: ProductActions.LoadingProduct})
                const response = await getProduct(productId);
                if (response.success) {
                    dispatch({
                        type: ProductActions.LoadingProductDone,
                        success: true,
                        product: response.product
                    })
                } else {
                    dispatch({
                        type: ProductActions.LoadingProductDone,
                        success: false,
                        error: response.errors
                    })
                }
            })();
        }
    }, [productId])

    if (productId && !state.loading && state.success) {
        return (
            <Box
                sx={{
                    padding: "24px 128px",
                    width: "100%"
                }}
            >
                <ProductForm product={state.product} />
            </Box>
        )
    }

    if (productId && state.loading) {
        return (
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100vh - 65px)",
                    justifyContent: "center",
                    padding: "24px 128px",
                    width: "100%"
                }}
            >
                <CircularProgress />
                <Typography variant="body1" sx={{ fontFamily: "inherit", marginTop: 1}}>
                    Loading a product...
                </Typography>
            </Box>
        )
    }

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