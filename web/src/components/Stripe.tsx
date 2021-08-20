import * as React from "react";
import Marquee from "react-fast-marquee";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: "#FFD644",
        display: "flex",
        justifyContent: "space-around",
        padding: theme.spacing(3, 0),
        width: "100%",
    },
    text: {
        color: "#242424",
        fontFamily: "Monument Extended",
        fontSize: `${theme.spacing(8)}px`,
        fontWeight: 400,
        letterSpacing: "4px",
        lineHeight: "76.8px",
        textTransform: "uppercase",
    }
});

interface StripeProps extends WithStyles<typeof styles> {};

const Stripe = withStyles(styles)(({ classes, children }: React.PropsWithChildren<StripeProps>) => (
    <Box className={classes.root} component="div">
        <Marquee play direction="left" gradient={false}>
            <Typography className={classes.text} variant="h1">
                {children}
            </Typography>
        </Marquee>
    </Box>
));

export default Stripe;