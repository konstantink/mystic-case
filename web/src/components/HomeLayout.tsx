import React from "react";

import { createStyles, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { withStyles, WithStyles } from "@mui/styles";

import * as api from "../api/api";
import Description from "./Description";
import FAQSection from "./Faq";
import FeaturesSection, { Feature } from "./Feature";
import FeedbackSection from "./Feedback";
import Footer from "./Footer";
import PlanetMysticCase from "./PlanetMysticCase";
import { FeaturedProductsList } from "./Product";
import RequirementsSection, { Requirement } from "./Requirement";
import { ButtonLink, MainScene } from "@mysticcase/ui";
import Stripe from "./Stripe";
// import Star from "./Star";
import VideoIntroduction from "./VideoIntroduction";
import ClockIcon from "../icons/Clock";
import FamilyIcon from "../icons/Family";
import FriendsIcon from "../icons/Friends";
import { ProductItem } from "../types";

import { Header } from "@mysticcase/layout/Header";

const styles = (theme: Theme) => createStyles({
    rootContainer: {
        // background: "src()"
    },
    mainRows: {
        height: "100%",
        // paddingLeft: theme.spacing(12),
        // paddingRight: theme.spacing(12),
        paddingTop: theme.spacing(18.5),
        // "& .row-wrapper:not(:first-child)": {
        //     paddingTop: theme.spacing(18),
        // }
    },
    ellipse: {
        backgroundColor: "#fff",
        borderRadius: 319,
        filter: "blur(200px)",
        // float: "left",
        height: 637,
        mixBlendMode: "overlay",
        // opacity: 0.6,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "4%",
        // right: 0,
        width: 637,
    },
    backgroundCover: {
        backfaceVisibility: "visible",
        minHeight: "100vh",
    },
    firstContainer: {
        paddingTop: 119,
    },
    row: {
        position: "relative",
    },
    parallaxContainer: {
        // alignItems: "center",
        display: "flex",
        // justifyContent: "center",
        height: "100%",
        position: "relative",
    },
    boxImg: {
        filter: "brightness(1.3) drop-shadow(2px 4px 6px black)",
        height: 351,
        imageRendering: "-webkit-optimize-contrast",
        left: 150,
        position: "absolute",
        top: 120,
        width: 565,
        zIndex: 5,
    },
    leftGhostImg: {
        filter: "brightness(1.3) drop-shadow(2px 4px 6px black)",
        height: 408,
        imageRendering: "-webkit-optimize-contrast",
        left: 25,
        position: "absolute",
        top: 65,
        width: 232,
        zIndex: 10,
    },
    rightGhostImg: {
        filter: "brightness(1.3) drop-shadow(2px 4px 6px black)",
        height: 240,
        imageRendering: "-webkit-optimize-contrast",
        left: 525,
        position: "absolute",
        top: 290,
        width: 186,
        zIndex: 9,
    },
    backGhostImg: {
        filter: "brightness(0.85) contrast(1.05)",
        height: 279,
        imageRendering: "-webkit-optimize-contrast",
        left: 350,
        position: "absolute",
        top: 0,
        width: 214,
        zIndex: 0,
    },
    rightSideText: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(16),
        "& h1": {
            fontFamily: "Pangram",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: "74px",
            letterSpacing: "0.4px",
            textTransform: "capitalize",
        },
        "& p": {
            fontFamily: "Pangram",
            fontSize: 24,
            fontWeight: "normal",
            lineHeight: "36px",
            letterSpacing: "0.3px",
        },
    },
    requirementContainer: {
        background: "rgba(57, 49, 133, 0.4)",
    },
    featureContainer: {

    },
});

type HomeLayoutProps = WithStyles<typeof styles>;

const HomeLayout: React.FunctionComponent<HomeLayoutProps> = ({ classes }: HomeLayoutProps) => {
    // const ref = React.useRef<IParallax>(null);
    const [products, setProducts] = React.useState<Array<ProductItem>>([]);

    const requirements: Array<Requirement> = [{
        icon: <ClockIcon delay={0} />,
        text: "Time about 2 hours",
        delay: 0,
    }, {
        icon: <FamilyIcon delay={400} />,
        text: "Age from 7+ to adult",
        delay: 400,
    }, {
        icon: <FriendsIcon delay={800} />,
        text: "Team from 2-5 persons",
        delay: 800,
    }];

    const features: Array<Feature> = [
        { name: "Perfect Family Activity", text: "Spend quality time all together - there is something for everyone!", imageUrl: "/assets/images/family.jpeg" },
        { name: "Fun Activity for Couples", text: "Hang out with your partner instead of just watching TV", imageUrl: "/assets/images/couple.jpeg" },
        { name: "Friends Gathering", text: "A fun activity for friends to do and spend time in a new unusual way", imageUrl: "/assets/images/friends.jpeg" }
    ];

    React.useEffect(() => {
        (async () => {
            const response = await api.getFeaturedProducts();
            setProducts(response.products);
        })();
    }, []);

    return (
        <Box component="div" style={{ backgroundColor: "#3A3185", color: "#FEFEFE" }}>
            <Header />
            <main className={classes.mainRows}>
                <div className="row-wrapper">
                    <Box justifyContent="center" display="flex" sx={{ paddingBottom: 22, paddingLeft: 12, paddingRight: 12, width: "100%" }}>
                        <Grid container sx={{ maxWidth: "calc(1920px - 2 * 96px)" }} spacing={1}>
                            <Grid xs={6} style={{ height: 637 }}>
                                <MainScene />
                            </Grid>
                            <Grid xs={6}
                                sx={{
                                    alignItems: "flex-start",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    paddingTop: 16,
                                    "& h1": {
                                        fontFamily: "Pangram",
                                        fontSize: 72,
                                        fontWeight: 700,
                                        lineHeight: "74px",
                                        letterSpacing: "0.4px",
                                        textTransform: "capitalize",
                                    },
                                    "& p": {
                                        fontFamily: "Pangram",
                                        fontSize: 24,
                                        fontWeight: "normal",
                                        lineHeight: "36px",
                                        letterSpacing: "0.3px",
                                    },
                                }}
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
                                {/* <Button disableRipple>
                                    Shop now
                                </Button> */}
                                <ButtonLink to="/shop">
                                    Shop now
                                </ButtonLink>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div className="row-wrapper">
                    <Stripe>
                        Escape room in a box right at home&nbsp;
                    </Stripe>
                </div>
                <div className="row-wrapper">
                    <FeaturesSection content={features} />
                </div>
                <div className="row-wrapper">
                    <RequirementsSection requirements={requirements} />
                </div>
                <div className="row-wrapper" style={{ backgroundColor: "#E5E5E5", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 120, paddingTop: 160 }}>
                    <Typography variant="h2" style={{ color: "#231E52", fontFamily: "Pangram", fontSize: "72px", fontWeight: 700, lineHeight: "74px", letterSpacing: "0.4px", paddingBottom: 120, textAlign: "center" }}>
                        Choose your box
                    </Typography>
                    <FeaturedProductsList products={products} />
                    <div style={{ width: "100%" }}>
                        <div style={{ border: "2px solid #938CD1", borderRadius: 4, margin: "0 96px 80px 96px" }}></div>
                    </div>
                    <Typography variant="h2" style={{ color: "#231E52", fontFamily: "Pangram", fontSize: 56, fontWeight: "bold", lineHeight: "64px", letterSpacing: "0.4px", marginBottom: 40, maxWidth: 705, textAlign: "center", textTransform: "capitalize" }}>
                        Want to see more? Check out our shop page
                    </Typography>
                    <ButtonLink to="/shop">
                        Choose a box
                    </ButtonLink>
                </div>
                <div className="row-wrapper">
                    <VideoIntroduction />
                </div>
                <div className="row-wrapper">
                    <PlanetMysticCase />
                </div>
                <div className="row-wrapper">
                    <Stripe>
                        New way to spend pleasure time at home&nbsp;
                    </Stripe>
                </div>
                <div className="row-wrapper">
                    <Description />
                </div>
                <div className="row-wrapper">
                    <FeedbackSection />
                </div>
                <div className="row-wrapper">
                    <FAQSection />
                </div>
                <div className="row-wrapper">
                    <Footer />
                </div>
            </main>
        </Box>
    );
};

export default withStyles(styles)(HomeLayout);
