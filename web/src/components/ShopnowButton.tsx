import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";

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

interface ShopnowButtonProps extends React.PropsWithChildren<WithStyles<typeof styles>> {};


const ShopnowButton = withStyles(styles)(({ classes, children }: ShopnowButtonProps) => (
    <Box className={classes.container} component="div">
        <Link to="/shop">
            {children}
            <Typography variant="button" className={classes.button} component="span" />
        </Link>
    </Box>
));

export default ShopnowButton;