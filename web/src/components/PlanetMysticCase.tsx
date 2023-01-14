import clsx from "clsx";
import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import ShopnowButton from "./ShopnowButton";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(20, 17.5, 20, 17.5),
    },
    container: {

    },
    rightSide: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(22, 0),
    },
    leftSide: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
    },
    h1: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: 72,
        fontWeight: 700,
        letterSpacing: "0.4px",
        lineHeight: "74px",
        textTransform: "capitalize",
    },
    yellowH1: {
        color: "#FFD644",
    },
    text: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: theme.spacing(3),
        fontWeight: "normal",
        letterSpacing: "0.3px",
        lineHeight: "36px",
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(4),
    },
    ellipse: {
        backgroundColor: "#fff",
        borderRadius: theme.spacing(60),
        filter: "blur(560px)",
        // float: "left",
        height: theme.spacing(120),
        mixBlendMode: "overlay",
        // opacity: 0.6,
        position: "absolute",
        // top: 0,
        // bottom: 0,
        // left: "4%",
        // right: 0,
        width: theme.spacing(120),
    },
    planet: {
        zIndex: 2,
        "& img": {
            // filter: "drop-shadow(2px 4px 6px black)",
            height: "100%",
            imageRendering: "-webkit-optimize-contrast",
            objectFit: "contain",
            width: "100%",
        },
        // "& div": {
        //     marginBottom: 2,
        // }
    },
    tm: {
        transform: "rotate(-1.81deg)",
    },
    sim: {
        transform: "rotate(-90deg)",
    },
    ufo: {
        transform: "rotate(11.46deg)",
    },
    som: {
        transform: "rotate(90deg)",
    },
    nt: {
        transform: "rotate(180deg)",
    },
    holmes: {
        transform: "rotate(172.24deg)",
    },
    liEmpty: {
        alignItems: "center",
        color: "#938CD1",
        border: "4px dashed #938CD1",
        borderRadius: theme.spacing(3),
        display: "flex",
        fontFamily: "Pangram",
        fontSize: theme.spacing(12),
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "0.4px",
        lineHeight: "74px",
        width: "100%",
    },
    vdEmpty: {
        transform: "rotate(-2.37deg)",
    },
}));

const PlanetMysticCase = () => {
    const classes = useStyles();

    return (
        <Box component="div" className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={6} className={classes.rightSide}>
                    <Typography variant="h2" className={classes.h1}>
                        Collect your
                    </Typography>
                    <Typography variant="h2" className={clsx(classes.h1, classes.yellowH1)}>
                        Mystic case planet
                    </Typography>
                    <Typography variant="body1" className={classes.text}>
                        Each box from Planet series contains a magnet with a piece of a planet. Collect all 9 magnets to gather you own Mystic Case planet!
                    </Typography>
                    <ShopnowButton>
                        Choose a box
                    </ShopnowButton>
                </Grid>
                <Grid item xs={6} className={classes.leftSide}>
                    <Box component="div" className={classes.ellipse}></Box>
                    <Grid container className={classes.planet} spacing={2}>
                        <Grid item xs={4} className={classes.tm}>
                            <img src="/assets/images/magnit_tm.png" alt="Time Machine" />
                        </Grid>
                        <Grid item xs={4}>
                            <img src="/assets/images/magnit_hc.png" alt="Haunted Castle" />
                        </Grid>
                        <Grid item xs={4} className={classes.ufo}>
                            <img src="/assets/images/magnit_ufo.png" alt="UFO Crash" />
                        </Grid>
                        <Grid item xs={4} className={classes.sim}>
                            <img src="/assets/images/magnit_sim.png" alt="Simulation Theory" />
                        </Grid>
                        <Grid item xs={4}>
                            <Box component="div" className={classes.liEmpty}>?</Box>
                        </Grid>
                        <Grid item xs={4} className={classes.som}>
                            <img src="/assets/images/magnit_som.png" alt="School of Magic" />
                        </Grid>
                        <Grid item xs={4}>
                            <Box component="div" className={clsx(classes.liEmpty, classes.vdEmpty)}><span>?</span></Box>
                        </Grid>
                        <Grid item xs={4} className={classes.nt}>
                            <img src="/assets/images/magnit_nt.png" alt="National Treasure" />
                        </Grid>
                        <Grid item xs={4} className={classes.holmes}>
                            <img src="/assets/images/magnit_holmes.png" alt="Unfinished case of Holmes" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlanetMysticCase;
