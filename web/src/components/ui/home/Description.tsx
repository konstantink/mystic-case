import * as React from "react";
import { animated } from "react-spring";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { ButtonLink } from "@mysticcase/ui";

import styles from "@styles/ui/home.module.scss";

const BulletIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 0C14.3241 0 0 14.3279 0 32C0 49.6741 14.3259 64 32 64C49.6721 64 63.998 49.6741 63.998 32C63.998 14.3299 49.6721 0 32 0ZM32 57.9999C17.6401 57.9999 6.0001 46.3599 6.0001 32C6.0001 17.6401 17.6421 6.0001 32 6.0001C46.3579 6.0001 57.9979 17.6401 57.9979 32C57.9979 46.3599 46.3581 57.9999 32 57.9999ZM44.5761 18.388C43.216 17.5761 41.4781 18.058 40.6961 19.468L29.966 38.742L23.9901 31.468C22.9081 30.222 21.4702 29.5761 20.1121 30.388C18.752 31.2019 18.19 33.1601 19.0702 34.4161L27.3862 44.5381C28.0081 45.346 28.7181 45.8301 29.4602 45.9682L29.4662 45.9802L29.5423 45.9843C29.7103 46.0102 32.2224 46.4742 33.3044 44.5383L45.6205 22.4164C46.402 21.0039 45.9362 19.202 44.5761 18.388Z" fill="#B3D138"/>
    </svg>
);

export const Description = () => {
    const features = [
        "Exciting plot with logical and interactive tasks;",
        "Various objects and tool;",
        "Clues, cyphers, tasks, puzzles and codes;",
        "Detailed hints for every stage if you're stuck."
    ];

    return (
        <Box className={styles["mc-desc-container"]} component="div">
            <Grid container spacing={10}>
                <Grid item xs={6} className={styles["mc-dsc-left-side"]}>
                    <animated.div className={`${styles["mc-dsc-img-container"]} ${styles["mc-dsc-back-img"]}`}>
                        <img src="/assets/images/description_1.webp" alt="Collaboration" />
                    </animated.div>
                    <animated.div className={`${styles["mc-dsc-img-container"]} ${styles["mc-dsc-front-img"]}`}>
                        <img src="/assets/images/description_2.webp" alt="Fun" />
                    </animated.div>
                </Grid>
                <Grid item xs={6} className={styles["mc-dsc-right-side"]}>
                    <Typography variant="h2" className={`${styles["mc-dsc-h1"]} ${styles["mc-dsc-margin-bottom80"]}`}>
                        Your&nbsp;
                        <Typography variant="body1" display="inline" className={`${styles["mc-dsc-h1"]} ${styles["mc-color-yellow"]}`}>
                            fun activity
                        </Typography>
                    </Typography>
                    <List dense={false} className={styles["mc-dsc-margin-bottom80"]}>
                        {features.map((item, idx) => (
                            <ListItem key={`feature-item-${idx}`} disableGutters className={`${styles["mc-dsc-item"]} ${styles["mc-dsc-margin-bottom40"]}`}>
                                <ListItemIcon>
                                    <BulletIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{ className: styles["mc-dsc-h4"] }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <ButtonLink to="/shop">
                        Shop now
                    </ButtonLink>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Description;
