import clsx from "clsx";
import * as React from "react";
import { animated } from "react-spring";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";


import ShopnowButton from "./ShopnowButton";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(25, 12),
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
    rightSide: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(5),
    },
    leftSide: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    marginBottom80: {
        marginBottom: theme.spacing(10),
    },
    marginBottom40: {
        marginBottom: theme.spacing(5),
    },
    yellowH1: {
        color: "#FFD644",
    },
    h4: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: "0.4px",
        lineHeight: "40px",
    },
    item: {
        "& div:first-child": {
            marginRight: theme.spacing(4),
        }
    },
    imgContainer: {
        "& img": {
            borderRadius: theme.spacing(3),
            height: "100%",
            objectFit: "cover",
            width: "100%",
        },
    },
    backImg: {
        transform: "rotate(-10.54deg)",
        width: "90%",
    },
    frontImg: {
        height: "65%",
        top: "30%",
        position: "absolute",
        transform: "rotate(4.14deg)",
        width: "80%",
        zIndex: 10,
    }
}));

const BulletIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 0C14.3241 0 0 14.3279 0 32C0 49.6741 14.3259 64 32 64C49.6721 64 63.998 49.6741 63.998 32C63.998 14.3299 49.6721 0 32 0ZM32 57.9999C17.6401 57.9999 6.0001 46.3599 6.0001 32C6.0001 17.6401 17.6421 6.0001 32 6.0001C46.3579 6.0001 57.9979 17.6401 57.9979 32C57.9979 46.3599 46.3581 57.9999 32 57.9999ZM44.5761 18.388C43.216 17.5761 41.4781 18.058 40.6961 19.468L29.966 38.742L23.9901 31.468C22.9081 30.222 21.4702 29.5761 20.1121 30.388C18.752 31.2019 18.19 33.1601 19.0702 34.4161L27.3862 44.5381C28.0081 45.346 28.7181 45.8301 29.4602 45.9682L29.4662 45.9802L29.5423 45.9843C29.7103 46.0102 32.2224 46.4742 33.3044 44.5383L45.6205 22.4164C46.402 21.0039 45.9362 19.202 44.5761 18.388Z" fill="#B3D138"/>
    </svg>
)

const Description = () => {
    const classes = useStyles();
    const features = [
        "Exciting plot with logical and interactive tasks;",
        "Various objects and tool;",
        "Clues, cyphers, tasks, puzzles and codes",
        "Detailed hints for every stage if you're stuck.",
    ]

    return (
        <Box component="div" className={classes.root}>
            <Grid container spacing={10}>
                <Grid item xs={6} className={classes.leftSide}>
                    <animated.div className={clsx(classes.imgContainer, classes.backImg)}>
                        <img src="/assets/images/description_1.webp" alt="Collaboration" />
                    </animated.div>
                    <animated.div className={clsx(classes.imgContainer, classes.frontImg)}>
                        <img src="/assets/images/description_2.webp" alt="Fun" />
                    </animated.div>
                </Grid>
                <Grid item xs={6} className={classes.rightSide}>
                    <Typography variant="h2" className={clsx(classes.h1, classes.marginBottom80)}>
                        Your&nbsp;
                        <Typography variant="h2" component="span" className={clsx(classes.h1, classes.yellowH1)}>
                            fun activity
                        </Typography>
                    </Typography>
                    <List dense={false} className={classes.marginBottom80}>
                        {features.map((item, idx) => (
                            <ListItem key={`feature-item-${idx}`} disableGutters className={clsx(classes.item, classes.marginBottom40)}>
                                <ListItemIcon>
                                    <BulletIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{ className: classes.h4 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <ShopnowButton>
                        Shop now
                    </ShopnowButton>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Description;