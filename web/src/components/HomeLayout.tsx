import clsx from "clsx";
import React from "react";

import { createStyles, Theme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { withStyles, WithStyles } from "@mui/styles";


import * as api from "../api/api";
import Description from "./Description";
import FAQSection from "./Faq";
import FeatureView, { Feature } from "./Feature";
import FeedbackSection from "./Feedback";
import Footer from "./Footer";
import Menu from "./Menu";
import PlanetMysticCase from "./PlanetMysticCase";
import { FeaturedProductsList } from "./Product";
import RequirementView, { Requirement } from "./Requirement";
import ShopnowButton from "./ShopnowButton";
import Stripe from "./Stripe";
import Star from "./Star";
import VideoIntroduction from "./VideoIntroduction";
import ClockIcon from "../icons/Clock";
import FamilyIcon from "../icons/Family";
import FriendsIcon from "../icons/Friends";
import { ProductItem } from "../types";

interface HomeLayoutProps extends WithStyles<typeof styles> { };

interface HeaderProps extends WithStyles<typeof headerStyles> { 
    invert?: boolean;
};

interface LogoProps {
    containerClass: string;
};

interface RequirementsSectionProps extends WithStyles<typeof requirementStyles> {
    requirements: Array<Requirement>;
}

interface FeaturesSectionProps extends WithStyles<typeof featuresStyles> {
    content: Array<Feature>;
}


const headerStyles = (theme: Theme) => createStyles({
    logoContainer: {
        // backgroundBlendMode: "multiply",
        // backgroundColor: "#FFF",
        // backgroundImage: "url(/assets/logo.png)",
        width: 117,
        height: 80,
        objectFit: "cover",
        "& img": {
            height: "100%",
            width: "100%",
        },
        // paddingLeft: 30,
        // paddingTop: 20,
    },
    purple: {
        filter: "brightness(1)",
    },
    white: {
        filter: "brightness(0) invert(1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: theme.spacing(6, 12, 0),
        zIndex: 10,
        // position: "absolute"
    },
});

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
        //float: "left",
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
        position: "relative" 
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
        zIndex: 0
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
        }
    },
    requirementContainer: {
        background: 'rgba(57, 49, 133, 0.4)',
    },
    featureContainer: {

    },
});

const requirementStyles = (theme: Theme) => createStyles({
    container: {
        backgroundColor: "#231E52",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: theme.spacing(20, 12),
        // width: "100%",

        "& h5": {
            align: "center",
            color: "rgb(255, 255, 255)",
            fontFamily: "Pangram",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "0.4px",
            lineHeight: "40px",
        },

        "& h2": {
            fontFamily: "Balsamiq Sans,Roboto,Arial",
        },
    // },
    // requirementContent: {
        // "@media screen and (min-width: 106.25em)": {
        //     padding: 0,
        //     width: "calc(1.3333 * 1200px)",
        //     "& h1": {
        //         fontSize: "4rem",
        //     },
        //     "& h2": {
        //         fontSize: "3rem",
        //     }
        // },

        // "@media screen and (min-width: 64em)": {
        //     padding: 0,
        //     width: 1200,

        //     "& h1": {
        //         fontSize: "3rem",
        //     },
        //     "& h2": {
        //         fontSize: "2rem",
        //     },
        // },

        // [theme.breakpoints.down("xs")]: {
        //     "& h1": {
        //         fontSize: "2rem",
        //     },
        //     "& h2": {
        //         fontSize: "1.5rem",
        //     },
        // }
    },
});

const featuresStyles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(20, 12),
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    interactiveTextContainer: {
        // padding: theme.spacing(0, 34, 15),
        paddingBottom: theme.spacing(15),
    },
    interactiveText: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: "56px",
        fontWeight: 600,
        letterSpacing: "0.4px",
        lineHeight: `${theme.spacing(8)}px`,
        // marginLeft: "auto",
        maxWidth: theme.spacing(120.5),
        textTransform: "capitalize"
    },
});

export const Logo: React.FunctionComponent<LogoProps> = ({ containerClass }: LogoProps) => {
    return (
        <div className={containerClass}>
            <img src="/assets/logo.png" alt="logo" />
        </div>
    )
}

export const Header = withStyles(headerStyles)(({ classes, invert=false }: HeaderProps) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <Box component="div">
                    <Logo containerClass={clsx(classes.logoContainer, invert ? classes.purple : classes.white)}/>
                </Box>
                <Menu invert={invert} />
            </header>
        </React.Fragment>
    )
});

const RequirementsSection = withStyles(requirementStyles)(({ classes, requirements }: RequirementsSectionProps) => {
    return (
        <Box component="div" className={classes.container}>
            {requirements.map((item, idx) => (
                <RequirementView key={`requirement-view-${idx}`} {...item} />
            ))}
        </Box>
    );
});

const FeaturesSection = withStyles(featuresStyles)(({ classes, content }: FeaturesSectionProps) => {
    return (
        <Box component="div" className={classes.root}>
            {/* <Box component="div" className={classes.interactiveTextContainer}> */}
            <Grid container className={classes.interactiveTextContainer} spacing={5}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                    <Typography variant="h2" className={classes.interactiveText}>
                        <span style={{ color: "#FFD644" }}>Mystic case</span> is an interactive game you can play on the table
                    </Typography>
                </Grid>
            </Grid>
            {/* </Box> */}
            {/* <Box component="div" className={classes.container}> */}
            <Grid container spacing={5}>
                {content.map((item, idx) => (
                    <Grid key={`feature-key-${idx}`} item xs={4}>
                        <FeatureView key={`feature-view-${idx}`} {...item} />
                    </Grid>
                ))}
            </Grid>
            {/* </Box> */}
        </Box>
    )
});

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
    }]

    const features: Array<Feature> = [
        {name: 'Perfect Family Activity', text: 'Spend quality time all together - there is something for everyone!', imageUrl: '/assets/images/family.jpeg'},
        {name: 'Fun Activity for Couples', text: 'Hang out with your partner instead of just watching TV', imageUrl: '/assets/images/couple.jpeg'},
        {name: 'Friends Gathering', text: 'A fun activity for friends to do and spend time in a new unusual way', imageUrl: '/assets/images/friends.jpeg'},
    ]

    React.useEffect(() => {
        (async () => {
            const response = await api.getFeaturedProducts();
            setProducts(response.products);
        })();
    }, [])

    return (
        <Box component="div" style={{backgroundColor: "#3A3185", color: "#FEFEFE"}}>
            <Header /> 
            <main className={classes.mainRows}>
                <div className="row-wrapper">
                    <Grid container style={{ paddingBottom: 178, paddingLeft: 96, paddingRight: 96 }}>
                        <Grid item xs={6} style={{ height: 637 }}>
                            <Container className={classes.parallaxContainer}>
                                {/* <GhostParallax /> */}
                                <img src="/assets/images/box.png" alt="box" className={classes.boxImg} />
                                <img src="/assets/images/left-ghost.png" alt="ghost_1" className={classes.leftGhostImg} />
                                <img src="/assets/images/right-ghost.png" alt="ghost_2" className={classes.rightGhostImg} />
                                <img src="/assets/images/back-ghost.png" alt="ghost_3" className={classes.backGhostImg} />
                                <Container disableGutters className={classes.ellipse}> </Container>
                                <Star height={64} width={56} left="42%" top={485} />
                                <Star height={16} width={14} left="11%" top={520} />
                                <Star height={48} width={42} left="26%" top={95} />
                                <Star height={24} width={20} left="43%" top={-75} />
                                <Star height={80} width={68} left="69%" top={-15} />
                            </Container>
                        </Grid>
                        <Grid item xs={6}
                            sx={{
                                alignItems: "flex-start",
                                display: "flex",
                                flexDirection: "column",
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
                                }
                            }}
                        >
                            <Typography variant="h1" sx={{ color: "#FFD644" }}>
                                Challenge your brain
                            </Typography>
                            <Typography variant="h1" sx={{ color: "#FFF" }} gutterBottom>
                                and spend quality time
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#FEFEFE", marginBottom: 5, maxWidth: "589px"}}>
                                Try the brand new way to spend your leisure time at home in the most fun and challengeable way!
                            </Typography>
                            <ShopnowButton>
                                Shop now
                            </ShopnowButton>
                        </Grid>
                    </Grid>
                </div>
                <div className="row-wrapper">
                    <Stripe>
                        Escape room in a box right at home
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
                    <ShopnowButton>
                        Shop now
                    </ShopnowButton>
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
    )
};

export default withStyles(styles)(HomeLayout);