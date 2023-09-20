import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
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

type ClassNameProps = {
    className?: string;
}

type ProductProps = ProductItem;

interface FeaturedProductsListProps {
    className?: string;
    products: Array<ProductItem>;
}

const ProductContainer = styled(Box)(({ theme }) => `
    margin-bottom: ${theme.spacing(15)};
    position: relative;
    & a, a:visited {
        color: #231E52;
        font-family: Pangram;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.3px;
        line-height: 30px;
        text-decoration: none;
    }
    & a::after {
        content: " >";
        color: #231E52;
    },
`);

const ImageContainer = styled(Box)(({ theme }) => `
    background-color: #3A3185;
    border-radius: ${theme.spacing(3)};
    max-height: 748px;
    margin-bottom: ${theme.spacing(3)};
    padding: ${theme.spacing(6)};
    max-width: 748px;
`);

const Image = styled(Box)(({ theme }) => `
    // background: url("/assets/images/family.jpeg");
    border-radius: ${theme.spacing(2)};
    height: 100%;
    // margin-bottom: ${theme.spacing(3)};
    overflow: hidden;
    width: 100%;
    & img {
        height: 100%;
        object-fit: cover;
        width: 100%;
    }
`);

const ProductPriceName = styled(Typography)`
    color: #231E52;
    font-family: Pangram;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0.4%;
    line-height: 40px;
`;

interface SomeProps {
    backgroundColor?: string;
    borderRadius?: string;
    height?: number;
    right?: number;
    top?: number;
    width?: number;
}

const LabelContainer = styled("div")<SomeProps>((props) => `
    align-content: center;
    align-items: center;
    background-color: ${props.backgroundColor ? props.backgroundColor : "none"};
    border-radius: ${props.borderRadius ? props.borderRadius : "0%"};
    display: flex;
    height: ${props.height}px;
    justify-content: center;
    position: absolute;
    right: ${props.right}px;
    text-align: center;
    top: ${props.top}px;
    width: ${props.width}px;
    z-index: 9999;
`);

const ActionSection = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ButtonSection = styled(Box)(({ theme }) => `
    display: flex;
    flex-direction: row;
    & div:not(:last-child) {
        margin-right: ${theme.spacing(2)};
    }
`);

const Gear = styled(({ className }: ClassNameProps) => (
    <div className={className}>
        <div></div>
        <div></div>
        <div></div>
    </div>
))`
    height: 156px;
    margin: auto;
    position: relative;
    width: 156px;
    & div {
        background: #FFD644;
        border-radius: 28px;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
    & div:first-of-type {
        transform: rotate(120deg);
    }
    & div:nth-of-type(2) {
        transform: rotate(240deg);
    }
`;

const useNewLabelStyles = makeStyles(() => ({
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
        },
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
        },
    });

    return (
        <LabelContainer right={0} top={0} height={156} width={156}>
            <animated.div className={classes.spinner} style={springProps}>
                <Gear />
            </animated.div>
            <span className={classes.text}>New</span>
        </LabelContainer>
    );
};

const BestSellerLabel = styled(({ className }: ClassNameProps) => (
    <LabelContainer backgroundColor="#B3D138" borderRadius="50%" top={-22} right={-22} height={220} width={220}>
        <span className={className}>Best seller</span>
    </LabelContainer>
))`
    color: #3A3185;
    font-family: "Monument Extended";
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 4px;
    line-height: 30px;
    text-transform: uppercase;
    transform: rotate(-15deg);
`;

export const Product = ({ ...product }: ProductProps) => {
    const springProps = useSpring({
        from: { scale: 1.25 },
        to: { scale: 1 },
        config: config.molasses,
    });

    return (
        <ProductContainer component="div">
            {product.isNew && (<NewLabel />)}
            {product.isBestseller && (<BestSellerLabel />)}
            <ImageContainer component="div">
                <Image component="div">
                    <animated.img src={product.images ? product.images[0].url : ""} alt={product.images ? product.images[0].name : "product image"} style={springProps}/>
                </Image>
            </ImageContainer>
            <Box flexDirection="row" display="flex" justifyContent="space-between" marginBottom="16px">
                <ProductPriceName variant="body1">
                    {product.name}
                </ProductPriceName>
                <ProductPriceName variant="body1">
                    {product.prices
                        ? Intl.NumberFormat("en-GB", { style: "currency", currency: product.prices[0].currency }).format(typeof product.prices[0].price === "number" ? product.prices[0].price / 100 : parseFloat(product.prices[0].price) / 100)
                        : "N/A"}
                </ProductPriceName>
            </Box>
            <TruncateText
                truncateBy="words"
                limit={20}
                showMore
                url={"/"}
            >
                {product.description}
            </TruncateText>
            <ActionSection component="div">
                <ButtonSection component="div">
                    <BuyNowButton />
                    <AddToCartButton />
                </ButtonSection>
                <DifficultyLevel difficulty={product.difficulty || 0} />
            </ActionSection>
        </ProductContainer>
    );
};

export const FeaturedProductsList = styled(({ className, products }: FeaturedProductsListProps) => (
    <Box component="div" className={className}>
        <Grid container disableEqualOverflow columnSpacing={5} sx={{ justifyContent: "center" }}>
            {products.sort((left: ProductItem, right: ProductItem) => {
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
            }).map((item, idx) => (
                <Grid key={`key-produc-${idx}`} xs={6} style={{ maxWidth: 886 }}>
                    <Product {...item} />
                </Grid>
            ))}
        </Grid>
    </Box>
))(({ theme }) => `
    // justify-content: space-between;
    padding-left: ${theme.spacing(12)};
    padding-right: ${theme.spacing(12)};
`);
