import * as React from "react";
import Marquee from "react-fast-marquee";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { createStyles, WithStyles, withStyles } from "@mui/styles";

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
    },
});

type StripeProps = WithStyles<typeof styles>;

const Stripe = withStyles(styles)(({ classes, children }: React.PropsWithChildren<StripeProps>) => (
    <Box className={classes.root} component="div">
        <Marquee play direction="left" gradient={false}>
            <Typography className={classes.text} variant="h2">
                {children}
            </Typography>
        </Marquee>
    </Box>
));

export default Stripe;
