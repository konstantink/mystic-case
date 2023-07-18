import * as React from "react";
import { Link } from "react-router-dom";

import Box, { BoxProps } from "@mui/material/Box";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Typography = styled(({ className, ...props }: TypographyProps) => (<MuiTypography className={className} component="span" {...props} />))(({ theme }) => `
    border-radius: ${theme.spacing(10)};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`);

const ShopnowButton = styled(({ className, children }: BoxProps) => (
    <Box className={className} component="div">
        <Link to="/shop">
            {children}
            <Typography variant="button" />
        </Link>
    </Box>
))(({ theme }) => `
    background: #B3D138;
    border-radius: ${theme.spacing(10)};
    // height: ${theme.spacing(10)};
    padding: ${theme.spacing(3, 5)};
    position: relative;

    & a {
        color: #3A3185;
        font-family: Pangram;
        font-size: ${theme.spacing(4)};
        font-weight: 900;
        line-height: "${theme.spacing(4)}";
        letter-spacing: 0.6px;
        text-decoration: none;
        text-transform: uppercase;
        white-space: nowrap;
    }
`);

export default ShopnowButton;
