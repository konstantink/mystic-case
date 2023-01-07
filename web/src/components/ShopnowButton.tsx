import * as React from "react";
import { Link } from "react-router-dom";

import Box, {BoxProps} from "@mui/material/Box";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { Theme, styled } from "@mui/material/styles";
import { createStyles, WithStyles, withStyles } from "@mui/styles";

const styles = (theme: Theme) => createStyles({
    container: {
        backgroundColor: "#B3D138",
        borderRadius: theme.spacing(10),
        // height: theme.spacing(10),
        padding: theme.spacing(3, 5),
        position: "relative",
        // width: theme.spacing(33),
        "& a": {
            color: "#3A3185",
            fontFamily: "Pangram",
            fontSize: theme.spacing(4),
            fontWeight: 900,
            lineHeight: `${theme.spacing(4)}px`,
            letterSpacing: "0.6px",
            textDecoration: "none",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
        }
    },
    button: {
        borderRadius: theme.spacing(10),
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
    },
});

interface ShopnowButtonProps extends React.PropsWithChildren<BoxProps> { };

const Typography = styled(({className, ...props}: TypographyProps) => (<MuiTypography className={className} component="span" {...props} />))`
    borderRadius: theme.spacing(10),
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
`

const ShopnowButton = styled(({ className, children }: ShopnowButtonProps) => (
    <Box className={className} component="div">
        <Link to="/shop">
            {children}
            <Typography variant="button" />
        </Link>
    </Box>
))(({ theme }) => `
    backgroundColor: "#B3D138",
    borderRadius: theme.spacing(10),
    // height: theme.spacing(10),
    padding: theme.spacing(3, 5),
    position: "relative",
    // width: theme.spacing(33),
    "& a": {
        color: "#3A3185",
        fontFamily: "Pangram",
        fontSize: theme.spacing(4),
        fontWeight: 900,
        lineHeight: "${theme.spacing(4)}px",
        letterSpacing: "0.6px",
        textDecoration: "none",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
    }
`);

export default ShopnowButton;