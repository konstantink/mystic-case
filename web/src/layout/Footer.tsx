import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import NotificationForm from "./NotificationForm";

const FooterContainer = styled(Box)(({ theme }) => `
    background: #231E52;
    display: flex;
    justify-content: center;
    padding: ${theme.spacing(15, 12)};
    width: 100%;

    & .footer-container {
        display: grid;
        grid-template-columns: 30% 10% 40% 1fr;
        max-width: calc(1920px - 2 * ${theme.spacing(12)});
        row-gap: ${theme.spacing(7.5)};
        width: 100%;
    }

    & .footer-link {
        margin-bottom: ${theme.spacing(3)};
        & a {
            color: #FEFEFE;
            font-family: Pangram;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 0.4%;
            line-height: 40px;
            text-decoration: none;
        }
    }

    & .footer-copy {
        color: #938CD180;
        font-family: Pangram;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 28px;
    }
`);

const Footer = () => (
    <FooterContainer component="div">
        <Box component="div" className="footer-container">
            <Box component="div">
                <NotificationForm />
            </Box>
            <Box component="div"></Box>
            <Box component="div" display="flex" flexDirection="column">
                <Typography variant="body1" className="footer-link">
                    <Link to="/shop">Shop</Link>
                </Typography>
                <Typography variant="body1" className="footer-link">
                    <Link to="/contacts" className="footer-link">Contacts</Link>
                </Typography>
                <Typography variant="body1" className="footer-link">
                    <Link to="/" className="footer-link">Shipping &amp; Returns</Link>
                </Typography>
                <Typography variant="body1" className="footer-link">
                    <Link to="/" className="footer-link">Public Offer</Link>
                </Typography>
            </Box>
            <Box component="div">
                !
            </Box>
            <Box component="div">
                <Typography variant="body2" className="footer-copy">
                    Mystic Case &copy; 2023. All rights reserved.
                </Typography>
            </Box>
        </Box>
    </FooterContainer>
);

export default Footer;
