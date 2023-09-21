import * as React from "react";
import Marquee from "react-fast-marquee";

import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "@styles/ui/home.module.scss";

export const Stripe = ({ children }: React.PropsWithChildren<BoxProps>) => (
    <Box className={styles["mc-stripe-container"]} component="div">
        <Marquee play direction="left" gradient={false}>
            <Typography className={styles["mc-stripe-text"]} variant="h2">
                {children}
            </Typography>
        </Marquee>
    </Box>
);

export default Stripe;
