import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import NotificationForm from "./NotificationForm";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        background: "#231E52",
        display: "grid",
        gridTemplateColumns: "30% 10% 40% 1fr",
        padding: theme.spacing(15, 12),
        rowGap: theme.spacing(7.5),
    },
    link: {
        marginBottom: theme.spacing(3),
        "& a": {
            color:"#FEFEFE",
            fontFamily: "Pangram",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "0.4%",
            lineHeight: "40px",
            textDecoration: "none",
        },
    },
    copy: {
        color: "#938CD180",
        fontFamily: "Pangram",
        fontSize: "18px",
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "28px",
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Box component="div" className={classes.container}>
            <Box component="div">
                <NotificationForm />
            </Box>
            <Box component="div"></Box>
            <Box component="div" display="flex" flexDirection="column">
                <Typography variant="body1" className={classes.link}>
                    <Link to="/shop">Shop</Link>
                </Typography>
                <Typography variant="body1" className={classes.link}>
                    <Link to="/contacts" className={classes.link}>Contacts</Link>
                </Typography>
                <Typography variant="body1" className={classes.link}>
                    <Link to="/" className={classes.link}>Shipping &amp; Returns</Link>
                </Typography>
                <Typography variant="body1" className={classes.link}>
                    <Link to="/" className={classes.link}>Public Offer</Link>
                </Typography>
            </Box>
            <Box component="div">
                !
            </Box>
            <Box component="div">
                <Typography variant="body2" className={classes.copy}>
                    Mystic Case &copy; 2021. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;