import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { ButtonLink } from "@mysticcase/ui";

import styles from "@styles/ui/home.module.scss";

export const PlanetMysticCase = () => (
    <Box component="div">
        <Grid container className="pmc-container">
            <Grid xs={6} className={styles["mc-pmc-right-side"]}>
                <Typography variant="h2" className={styles["mc-pmc-h1"]}>
                    Collect your
                </Typography>
                <Typography variant="h2" className={`${styles["mc-pmc-h1"]} ${styles["mc-color-yellow"]}`}>
                    Mystic case planet
                </Typography>
                <Typography variant="body1" className={styles["mc-pmc-text"]}>
                    Each box from Planet series contains a magnet with a piece of a planet. Collect all 9 magnets to gather you own Mystic Case planet!
                </Typography>
                <ButtonLink to="/shop">
                    Choose a box
                </ButtonLink>
            </Grid>
            <Grid xs={6} className={styles["mc-pmc-left-side"]}>
                <Box component="div" className={styles["mc-pmc-ellipse"]}></Box>
                <Grid container className={styles["mc-pmc-planet"]} spacing={2}>
                    <Grid xs={4} className={styles["mc-pmc-tm"]}>
                        <img src="/assets/images/magnit_tm.png" alt="Time Machine" />
                    </Grid>
                    <Grid xs={4}>
                        <img src="/assets/images/magnit_hc.png" alt="Haunted Castle" />
                    </Grid>
                    <Grid xs={4} className={styles["mc-pmc-ufo"]}>
                        <img src="/assets/images/magnit_ufo.png" alt="UFO Crash" />
                    </Grid>
                    <Grid xs={4} className={styles["mc-pmc-sim"]}>
                        <img src="/assets/images/magnit_sim.png" alt="Simulation Theory" />
                    </Grid>
                    <Grid xs={4}>
                        <Box component="div" className={styles["mc-pmc-li-empty"]}>?</Box>
                    </Grid>
                    <Grid xs={4} className={styles["mc-pmc-som"]}>
                        <img src="/assets/images/magnit_som.png" alt="School of Magic" />
                    </Grid>
                    <Grid xs={4}>
                        <Box component="div" className={`${styles["mc-pmc-li-empty"]} ${styles["mc-pmc-vd-empty"]}`}><span>?</span></Box>
                    </Grid>
                    <Grid xs={4} className={styles["mc-pmc-nt"]}>
                        <img src="/assets/images/magnit_nt.png" alt="National Treasure" />
                    </Grid>
                    <Grid xs={4} className={styles["mc-pmc-holmes"]}>
                        <img src="/assets/images/magnit_holmes.png" alt="Unfinished case of Holmes" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
);

export default PlanetMysticCase;
