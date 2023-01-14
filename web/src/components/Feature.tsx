import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { createStyles, WithStyles, withStyles } from "@mui/styles";

export type Feature = {
    name: string;
    text: string;
    imageUrl: string;
}

const featureStyles = (theme: Theme) => createStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: 549,
    },
    image: {
        // background: "url('/assets/images/family.jpeg')",
        borderRadius: theme.spacing(3),
        height: 594,
        marginBottom: theme.spacing(3),
        overflow: "hidden",
        width: "100%",
        "& img": {
            height: "100%",
            objectFit: "cover",
            width: "100%",
        },
    },
    header: {
        color: "#B3D138",
        fontFamily: "Pangram",
        fontSize: `${theme.spacing(4)}px`,
        fontWeight: 700,
        letterSpacing: "0.4%",
        lineHeight: "48px",
        marginBottom: theme.spacing(1),
    },
    text: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: `${theme.spacing(3)}px`,
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "36px",
    },
});

type FeatureProps = WithStyles<typeof featureStyles> & Feature;

const FeatureView = withStyles(featureStyles)(({ classes, name, text, imageUrl }: FeatureProps) => (
    <Box component="div" className={classes.container}>
        <Box component="div" className={classes.image}>
            <img src={imageUrl} alt={name} />
        </Box>
        <Typography variant="h3" className={classes.header}>
            {name}
        </Typography>
        <Typography variant="h4" className={classes.text}>
            {text}
        </Typography>
    </Box>
));

export default FeatureView;
