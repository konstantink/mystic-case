import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import styles from "@styles/ui/home/features.module.scss";

export type Feature = {
    name: string;
    text: string;
    imageUrl: string;
}

interface FeaturesProps {
    className?: string;
    content: Array<Feature>;
}

type FeatureProps = {
    className?: string;
} & Feature;

const FeatureView = ({ name, text, imageUrl }: FeatureProps) => (
    <Box component="div" className={styles["mc-features-feature-view"]}>
        <Box className={styles["mc-features-image-box"]} component="div">
            <img src={imageUrl} alt={name} />
        </Box>
        <Typography className={styles["mc-features-header-text"]} variant="h3">
            {name}
        </Typography>
        <Typography className={styles["mc-features-feature-text"]} variant="h4">
            {text}
        </Typography>
    </Box>
);

export const Features = ({ content }: FeaturesProps) => (
    <Box component="div" className={styles["mc-features-container"]}>
        <Grid container className={styles["mc-features-grid"]} columnSpacing={5}>
            <Grid xs={4}></Grid>
            <Grid xs={8}>
                <Typography className={styles["mc-features-interactive-text"]} variant="h2">
                    <span className={styles["mc-features-yellow-text"]}>Mystic case</span> is an interactive game you can play on the table
                </Typography>
            </Grid>
        </Grid>
        <Grid container columnSpacing={5}>
            {content.map((item, idx) => (
                <Grid key={`feature-key-${idx}`} xs={4}>
                    <FeatureView key={`feature-view-${idx}`} {...item} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default Features;
