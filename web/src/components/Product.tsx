import * as React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { animated, config, useSpring } from "@react-spring/web";

import { ProductItem } from "../types";
import TruncateText from "./TruncateText";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import DifficultyLevel from "./DifficultyLevel";

// export type ProductImage = {
//     id: number,
//     url: string,
//     name: string,
// }

// export type ProductItem = {
//     images: Array<ProductImage>;
// }

type ProductProps = ProductItem & WithStyles<typeof styles>;

interface FeaturedProductsListProps extends WithStyles<typeof featuredListStyles> {
    products: Array<ProductItem>;
}

const styles = (theme: Theme) => createStyles({
    productContainer: {
        marginBottom: theme.spacing(15),
        position: "relative",
        "& a, a:visited": {
            color: "#231E52",
            fontFamily: "Pangram",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.3px",
            lineHeight: "30px",
            textDecoration: "none",
        },
        "& a::after": {
            content: "' >'",
            color: "#231E52",
        }
    },
    imageContainer: {
        backgroundColor: "#3A3185",
        borderRadius: theme.spacing(3),
        height: 748,
        marginBottom: theme.spacing(3),
        padding: theme.spacing(6),
        width: 748,
    },
    image: {
        // background: "url('/assets/images/family.jpeg')",
        borderRadius: theme.spacing(2),
        height: 748,
        // marginBottom: theme.spacing(3),
        overflow: "hidden",
        width: 748,
        "& img": {
            height: "100%",
            objectFit: "cover",
            width: "100%",
        }
    },
    productNamePrice: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: "32px",
        fontWeight: 700,
        letterSpacing: "0.4%",
        lineHeight: "40px",
    },
    productDescription: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: "20px",
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "30px",
        marginBottom: theme.spacing(4),
    },
    actionSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // position: "absolute",
        // marginBottom: theme.spacing(15),
    },
    buttonSection: {
        display: "flex",
        flexDirection: "row",
        "& div:not(:last-child)": {
            marginRight: theme.spacing(2),
        },
    },
});

const featuredListStyles = (theme: Theme) => createStyles({
    root: {
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        // width: "calc(100% - 40px)",
    }
})

const useNewLabelStyles = makeStyles((theme: Theme) => ({
    container: {
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        height: 156,
        justifyContent: "center",
        position: "absolute",
        right: 0,
        top: 0,
        width: 156,
        zIndex: 9999,
    },
    spinner: {
        display: "flex",
        height: 156,
        position: "absolute",
        // right: 0,
        // top: 0,
    },
    gear: {
        // borderRadius: "50%",
        height: 156,
        margin: "auto",
        position: "relative",
        width: 156,
        "& div": {
            background: "#FFD644",
            borderRadius: 28,
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
        },
        "& div:first-child": {
            transform: "rotate(120deg)",
        },
        "& div:nth-child(2)": {
            transform: "rotate(240deg)",
        },
        "& div:nth-child(3)": {
            // transform: "rotate(120deg)",
        }
    },
    text: {
        color: "#242424",
        fontFamily: "Monument Extended",
        fontSize: 40,
        fontWeight: "normal",
        letterSpacing: "4px",
        lineHeight: "48px",
        textTransform: "uppercase",
        transform: "rotate(-15deg)",
        // top: "50%",
    },
}));

const NewLabel = () => {
    const classes = useNewLabelStyles();
    const springProps = useSpring({
        from: { rotate: 0 },
        to: { rotate: 360 },
        loop: true,
        reset: true,
        config: {
            duration: 10000,
        }
    })

    return (
        <div className={classes.container}>
            <animated.div className={classes.spinner} style={springProps}>
                <div className={classes.gear}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </animated.div>
            <span className={classes.text}>New</span>
        </div>
    )
};

const useBestSellerLabelStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: "#B3D138",
        borderRadius: "50%",
        alignItems: "center",
        display: "flex",
        height: 220,
        position: "absolute",
        top: -22,
        right: -22,
        textAlign: "center",
        width: 220,
        zIndex: 9999,
    },
    text: {
        color: "#3A3185",
        fontFamily: "Monument Extended",
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: "4px",
        lineHeight: "30px",
        textTransform: "uppercase",
        transform: "rotate(-15deg)",
    },
}));

const BestSellerLabel = () => {
    const classes = useBestSellerLabelStyles();

    return (
        <div className={classes.container}>
            {/* <div className={classes.spinner} style={springProps}>
                <div className={classes.gear}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div> */}
            <span className={classes.text}>Best seller</span>
        </div>
    )
}

export const Product = withStyles(styles)(({ classes, ...product }: ProductProps) => {
    const springProps = useSpring({
        from: { scale: 1.25 },
        to: { scale: 1 },
        config: config.molasses,
    });

    return (
        <Box className={classes.productContainer}>
            {product.isNew && (<NewLabel />)}
            {product.isBestseller && (<BestSellerLabel />)}
            <Box className={classes.imageContainer}>
                <Box className={classes.image}>
                    <animated.img src={product.images[0].url} alt={product.images[0].name} style={springProps}/>
                </Box>
            </Box>
            <Box flexDirection="row" display="flex" justifyContent="space-between" marginBottom="16px">
                <Typography variant="h4" className={classes.productNamePrice}>
                    {product.name}
                </Typography>
                <Typography variant="h4" className={classes.productNamePrice}>
                    {Intl.NumberFormat('en-GB', {style: "currency", currency: product.currency}).format(product.price/100)}
                </Typography>
            </Box>
            <TruncateText 
                truncateBy="words" 
                limit={20} 
                className={classes.productDescription} 
                showMore
                url={"/"}
            >
                {product.description}
            </TruncateText>
            <Box component="div" className={classes.actionSection}>
                <Box component="div" className={classes.buttonSection}>
                    <BuyNowButton />
                    <AddToCartButton />
                </Box>
                <DifficultyLevel difficulty={product.difficulty} />
            </Box>
        </Box>
    );
});

export const FeaturedProductsList = withStyles(featuredListStyles)(({ classes, products }: FeaturedProductsListProps) => {
    return (
        <Grid className={classes.root} container justify="space-between">
            {products.sort((left: ProductItem, right: ProductItem) => {
                if (left.isNew && !right.isNew)
                    return -1;
                else if (!left.isNew && right.isNew)
                    return 1;
                else if (left.isBestseller && !right.isBestseller)
                    return -1;
                else if (!left.isBestseller && right.isBestseller)
                    return 1;
                else if (left.isFeatured && !right.isFeatured)
                    return -1;
                else if (!left.isFeatured && right.isFeatured)
                    return 1;
                else
                    return 0;
            }).map((item, idx) => (
                <Grid key={`key-produc-${idx}`} item xs={6} style={{ maxWidth: 844 }}>
                    <Product {...item} />
                </Grid>
            ))}
        </Grid>
    )
});