import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import ShopnowButton from "./ShopnowButton";

const PlanetMysticCase = styled(({ className }: { className?: string; }) => (
    <Box component="div" className={className}>
        <Grid container className="pmc-container">
            <Grid xs={6} className="pmc-right-side">
                <Typography variant="h2" className="pmc-h1">
                    Collect your
                </Typography>
                <Typography variant="h2" className="pmc-h1 pmc-yellow">
                    Mystic case planet
                </Typography>
                <Typography variant="body1" className="pmc-text">
                    Each box from Planet series contains a magnet with a piece of a planet. Collect all 9 magnets to gather you own Mystic Case planet!
                </Typography>
                <ShopnowButton>
                    Choose a box
                </ShopnowButton>
            </Grid>
            <Grid xs={6} className="pmc-left-side">
                <Box component="div" className="pmc-ellipse"></Box>
                <Grid container className="pmc-planet" spacing={2}>
                    <Grid xs={4} className="pmc-tm">
                        <img src="/assets/images/magnit_tm.png" alt="Time Machine" />
                    </Grid>
                    <Grid xs={4}>
                        <img src="/assets/images/magnit_hc.png" alt="Haunted Castle" />
                    </Grid>
                    <Grid xs={4} className="pmc-ufo">
                        <img src="/assets/images/magnit_ufo.png" alt="UFO Crash" />
                    </Grid>
                    <Grid xs={4} className="pmc-sim">
                        <img src="/assets/images/magnit_sim.png" alt="Simulation Theory" />
                    </Grid>
                    <Grid xs={4}>
                        <Box component="div" className="pmc-li-empty">?</Box>
                    </Grid>
                    <Grid xs={4} className="pmc-som">
                        <img src="/assets/images/magnit_som.png" alt="School of Magic" />
                    </Grid>
                    <Grid xs={4}>
                        <Box component="div" className="pmc-li-empty pmc-vd-empty"><span>?</span></Box>
                    </Grid>
                    <Grid xs={4} className="pmc-nt">
                        <img src="/assets/images/magnit_nt.png" alt="National Treasure" />
                    </Grid>
                    <Grid xs={4} className="pmc-holmes">
                        <img src="/assets/images/magnit_holmes.png" alt="Unfinished case of Holmes" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
))(({ theme }) => `
    padding: ${theme.spacing(20, 17.5, 20, 17.5)};

    & .pmc-container {
        max-width: calc(1920px - 2 * ${theme.spacing(12)});
    }

    & .pmc-right-side {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        padding: ${theme.spacing(22, 0)};
    }

    & .pmc-h1 {
        color: #FEFEFE
        font-family: "Pangram";
        font-size: ${theme.spacing(9)};
        font-weight: 700;
        letter-spacing: 0.4px;
        line-height: 74px;
        text-transform: capitalize;
    }

    & .pmc-yellow {
        color: #FFD644;
    }

    & .pmc-text {
        color: #FEFEFE;
        font-family: Pangram;
        font-size: ${theme.spacing(3)};
        font-weight: normal;
        letter-spacing: 0.3px;
        line-height: 36px;
        margin-bottom: ${theme.spacing(5)};
        margin-top: ${theme.spacing(4)};
    }

    & .pmc-left-side {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }

    & .pmc-ellipse {
        background-color: #fff;
        border-radius: ${theme.spacing(60)};
        filter: blur(560px);
        // float: left;
        height: ${theme.spacing(120)};
        mix-blend-mode: overlay;
        // opacity: 0.6;
        position: absolute;
        // top: 0;
        // bottom: 0;
        // left: 4%;
        // right: 0;
        width: ${theme.spacing(120)};
    }

    & .pmc-planet {
        z-index: 2;
        & img {
            // filter: drop-shadow(2px 4px 6px black);
            height: 100%;
            image-rendering: -webkit-optimize-contrast;
            object-fit: contain;
            width: 100%;
        },
        // & div {
        //     margin-bottom: 2px;
        // }
    }

    & .pmc-tm {
        transform: rotate(-1.81deg);
    }

    & .pmc-sim {
        transform: rotate(-90deg);
    }

    & .pmc-ufo {
        transform: rotate(11.46deg);
    }

    & .pmc-som {
        transform: rotate(90deg);
    }

    & .pmc-nt {
        transform: rotate(180deg);
    }

    & .pmc-holmes {
        transform: rotate(172.24deg);
    }

    & .pmc-li-empty {
        align-items: center;
        color: #938CD1;
        border: 4px dashed #938CD1;
        border-radius: ${theme.spacing(3)};
        display: flex;
        font-family: Pangram;
        font-size: ${theme.spacing(12)};
        font-weight: 700;
        height: 100%;
        justify-content: center;
        letter-spacing: 0.4px;
        line-height: 74px;
        width: 100%;
    }

    & .pmc-vd-empty {
        transform: rotate(-2.37deg);
    }
`);

export default PlanetMysticCase;
