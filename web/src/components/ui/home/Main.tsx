import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { ButtonLink } from "@mysticcase/ui";

import GhostScene from "./GhostScene";

import styles from "@styles/ui/home/main.module.scss";

export const Main = () => (
    <Box>
        <Grid container spacing={1}>
            <Grid xs={6} style={{ height: 637 }}>
                <GhostScene />
            </Grid>
            <Grid xs={6} className={styles["mc-home-text-container"]}
            >
                <Typography variant="h1" sx={{ color: "#FFD644" }}>
                    Challenge your brain
                </Typography>
                <Typography variant="h1" sx={{ color: "#FFF" }} gutterBottom>
                    and spend quality time
                </Typography>
                <Typography variant="body1" sx={{ color: "#FEFEFE", marginBottom: 5, maxWidth: "589px" }}>
                    Try the brand new way to spend your leisure time at home in the most fun and challengeable way!
                </Typography>
                <ButtonLink to="/shop">
                    Shop now
                </ButtonLink>
            </Grid>
        </Grid>
    </Box>
);
