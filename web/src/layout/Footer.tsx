import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FacebookLogo, InstagramLogo, NotificationForm } from "@mysticcase/ui";

import styles from "@styles/layout/footer.module.scss";

const Footer = () => (
    <footer className={styles["mc-footer-row"]}>
        <Box component="div" className={styles["mc-footer-container"]}>
            <Box component="div">
                <NotificationForm />
            </Box>
            <Box component="div"></Box>
            <Box component="div" display="flex" flexDirection="column">
                <Typography variant="body1" className={styles["mc-footer-link"]}>
                    <Link to="/shop">Shop</Link>
                </Typography>
                <Typography variant="body1" className={styles["mc-footer-link"]}>
                    <Link to="/contacts" className={styles["mc-footer-link"]}>Contacts</Link>
                </Typography>
                <Typography variant="body1" className={styles["mc-footer-link"]}>
                    <Link to="/" className={styles["mc-footer-link"]}>Shipping &amp; Returns</Link>
                </Typography>
                <Typography variant="body1" className={styles["mc-footer-link"]}>
                    <Link to="/" className={styles["mc-footer-link"]}>Public Offer</Link>
                </Typography>
            </Box>
            <Box component="div" display="flex" flexDirection="row">
                <Box className={styles["mc-footer-logo-wrapper"]} component="div">
                    <FacebookLogo />
                </Box>
                <Box className={styles["mc-footer-logo-wrapper"]} component="div">
                    <InstagramLogo />
                </Box>
            </Box>
            <Box component="div">
                <Typography variant="body2" className={styles["mc-footer-copy"]}>
                    Mystic Case &copy; 2023. All rights reserved.
                </Typography>
            </Box>
        </Box>
    </footer>
);

export default Footer;
