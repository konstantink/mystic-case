import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { animated, config, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import BestSellerLabel from "@mysticcase/icons/BestSellerLabel";
import NewLabel from "@mysticcase/icons/NewLabel";
import { ProductItem } from "@mysticcase/types";
import { Button, DifficultyLevel, TruncateText } from "@mysticcase/ui/common";

import styles from "@styles/ui/common/product.module.scss";

export interface ProductProps extends ProductItem {
    className?: string;
    delayIdx?: number
}

export const Product = ({ delayIdx, ...product }: ProductProps) => {
    const springProps = useSpring({
        from: {
            opacity: 0,
            transform: "translateY(100px)",
        },
        to: {
            opacity: 1,
            transform: "translateY(0px)",
        },
        delay: delayIdx ? delayIdx * 500 : 0,
        config: {
            ...config.molasses,
            duration: 750,
        },
    });

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "80px 0px",
    });

    return (
        <animated.div ref={ref} className={styles["mc-product-container"]} style={springProps}>
            <React.Fragment>
                {inView && (
                    <React.Fragment>
                        {product.isNew && (<NewLabel />)}
                        {product.isBestseller && (<BestSellerLabel />)}
                        <Box className={styles["mc-product-image-container"]} component="div">
                            <Box className={styles["mc-product-image"]} component="div">
                                <img className={styles["mc-product-image-animation"]} src={product.images ? product.images[0].url : ""} alt={product.images ? product.images[0].name : "product image"} />
                            </Box>
                        </Box>
                        <Box flexDirection="row" display="flex" justifyContent="space-between" marginBottom="16px">
                            <Typography className={styles["mc-product-price-name"]} variant="body1">
                                {product.name}
                            </Typography>
                            <Typography className={styles["mc-product-price-name"]} variant="body1">
                                {product.prices
                                    ? Intl.NumberFormat("en-GB", { style: "currency", currency: product.prices[0].currency }).format(typeof product.prices[0].price === "number" ? product.prices[0].price / 100 : parseFloat(product.prices[0].price) / 100)
                                    : "N/A"}
                            </Typography>
                        </Box>
                        <TruncateText
                            truncateBy="words"
                            limit={20}
                            showMore
                            url={"/"}
                        >
                            {product.description}
                        </TruncateText>
                        <Box className={styles["mc-product-action-section"]} component="div">
                            <Box className={styles["mc-product-button-section"]} component="div">
                                <Button>
                                    Buy now
                                </Button>
                                <Button variant="outlined">
                                    Add to cart
                                </Button>
                            </Box>
                            <DifficultyLevel difficulty={product.difficulty || 0} />
                        </Box>
                    </React.Fragment>
                )}

            </React.Fragment>
        </animated.div>
    );
};

export default Product;
