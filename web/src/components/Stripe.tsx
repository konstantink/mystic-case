import * as React from "react";
import Marquee from "react-fast-marquee";

import Box, { BoxProps } from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Typography = styled(MuiTypography)(({ theme }) => `
    color: #242424;
    font-family: "Monument Extended";
    font-size: ${theme.spacing(8)};
    font-weight: 400;
    letter-spacing: 4px;
    line-height: 76.8px;
    text-transform: uppercase;
`);

const Stripe = styled(({ className, children }: React.PropsWithChildren<BoxProps>) => (
    <Box className={className} component="div">
        <Marquee play direction="left" gradient={false}>
            <Typography variant="h2">
                {children}
            </Typography>
        </Marquee>
    </Box>
))(({ theme }) => `
    background-color: #FFD644;
    display: flex;
    justify-content: space-around;
    padding: ${theme.spacing(3, 0)};
    width: 100%;
`);

export default Stripe;
