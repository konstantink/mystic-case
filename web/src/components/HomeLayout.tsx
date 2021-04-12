import React from "react"

import { Container, createStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { StyledComponent, withStyles, WithStyles } from "@material-ui/styles";

interface HomeLayoutProps extends WithStyles<typeof styles> { };

interface HeaderProps extends WithStyles<typeof headerStyles> { };

interface LogoProps {
    containerClass: string;
};

type RequirementKey = "Time" | "Age" | "Team";
type Requirements = {[key in RequirementKey]: string[]};

type Feature = {
    name: string;
    text: string;
    advantages?: string[];
    imageUrl: string;
}

interface RequirementsSectionProps extends WithStyles<typeof requirementStyles> {
    content: Requirements;
}

interface FeaturesSectionProps extends WithStyles<typeof featuresStyles> {
    content: Array<Feature>;
}


const headerStyles = (theme: Theme) => createStyles({
    logoContainer: {
        paddingLeft: 30,
        paddingTop: 20,
    },
    header: {
        zIndex: 10,
        position: "absolute"
    },
});

const styles = (theme: Theme) => createStyles({
    rootContainer: {
        // background: "src()"
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
    bgImage: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        // height: "100vh",
        zIndex: 0,
        // width: "100%",
    },
    bg: {
        backgroundImage: "url('/assets/r8-fullsizerender.jpg')",
        backgroundPosition: "69.672% 7.65%",
        backgroundSize: "cover",
        height: "100%",
        opacity: 0.25,
        position: "fixed",
        top: 0,
        width: "100%",
    },
    requirementContainer: {
        background: 'rgba(57, 49, 133, 0.4)',
    },
    featureContainer: {

    },
});

const requirementStyles = (theme: Theme) => createStyles({
    requirementContainer: {
        display: "flex",
        flexDirection: "column",

        "& h1": {
            fontWeight: 400,
            color: "rgb(255, 255, 255)",
            fontFamily: "Balsamiq Sans,Roboto,Arial",
            lineHeight: 1.8,
        },

        "& h2": {
            fontFamily: "Balsamiq Sans,Roboto,Arial",
        },
    // },
    // requirementContent: {
        "@media screen and (min-width: 106.25em)": {
            padding: 0,
            width: "calc(1.3333 * 1200px)",
            "& h1": {
                fontSize: "4rem",
            },
            "& h2": {
                fontSize: "3rem",
            }
        },

        "@media screen and (min-width: 64em)": {
            padding: 0,
            width: 1200,

            "& h1": {
                fontSize: "3rem",
            },
            "& h2": {
                fontSize: "2rem",
            },
        },

        [theme.breakpoints.down("xs")]: {
            "& h1": {
                fontSize: "2rem",
            },
            "& h2": {
                fontSize: "1.5rem",
            },
        }
    },
    content: {
        alignContent: "baseline",
    }
});

const featuresStyles = (theme: Theme) => createStyles({

});

const Logo: React.FunctionComponent<LogoProps> = ({ containerClass }: LogoProps) => {
    return (
        <div className={containerClass}>
            <img src="/assets/logo.png" />
        </div>
    )
}

const Header = withStyles(headerStyles)(({ classes }: HeaderProps) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <Grid container>
                    <Grid item xs={2}>
                        <Logo containerClass={classes.logoContainer}/>
                    </Grid>
                </Grid>
            </header>
        </React.Fragment>
    )
});

const RequirementsSection = withStyles(requirementStyles)(({ classes, content }: RequirementsSectionProps) => {
    return(
        <Container className={classes.requirementContainer} maxWidth="xl">
            <Grid container xs={12}>
                {Object.entries(content).map((contents) => {
                    const [title, items] = contents;
                    return (
                        <Grid item container md={4} className={classes.content}>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h1">
                                    {title}
                                </Typography>
                            </Grid>
                            {items.map((item) => (
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h2" style={{color: 'rgb(53, 53, 53)'}}>
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
});

const FeatureView = ({name, text, advantages, imageUrl}: Feature) => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={6}>
                <Typography variant="h2">
                    {name}
                </Typography>
                <Typography variant="h4">
                    {text}
                </Typography>
                {advantages && (<Container>
                    <ul>
                        {advantages.map((item, idx) => (
                            <li key={`advantage-${idx}`}>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Container>)}
            </Grid>
            <Grid item xs={6}>
                <img src={imageUrl} alt={name} width={400} />
            </Grid>
        </Grid>
    </React.Fragment>
)

const FeaturesSection = withStyles(featuresStyles)(({ classes, content }: FeaturesSectionProps) => {
    return (
        <React.Fragment>
            {content.map((item, idx) => (
                <FeatureView key={`feature-view-${idx}`} {...item} />
            ))}
        </React.Fragment>
    )
});

const HomeLayout: React.FunctionComponent<HomeLayoutProps> = ({ classes }: HomeLayoutProps) => {
    const requirements: Requirements = {
        Time: ['about 2 hours'], 
        Team: ['2-5 persons'],
         Age: ['designed for adults', 'kids 7+ can join']
    };

    const features: Feature[] = [
        {name: 'Perfect family activity', text: 'Spend quality time all together - there is something for everyone!', advantages: ['you want to switch from routine', 'you have children from 7 years-old and want to spend fun time together', 'you have a teenager who is always on their smartphones or games'], imageUrl: 'https://files.ecommercedns.uk/239784/eed46f17a0c9c35dfff7f1aa33e2f461.jpg'},
        {name: 'Friends gathering', text: 'A fun activity for friends to do together and spend leisure time in a new unusual way', imageUrl: 'https://files.ecommercedns.uk/239784/ee680377a1f7397ce9c992caebb39f3f.jpg'},
        {name: 'Interesting, new things to do as a couple', text: 'Hang out with your partner instead of just watching TV', imageUrl: 'https://files.ecommercedns.uk/239784/a288c95a76c0044383b66ee956c1ede8.jpg'}
    ]

    return (
        <React.Fragment>
            <Header /> 
            <main className="main-rows">
                <div className="row-wrapper">
                    <div className={`row ${classes.backgroundCover}`}>
                        {/* <div className={classes.bgImage}>
                            <div className={classes.bg}></div>
                        </div> */}
                        <Container className={classes.firstContainer}>
                            <h1>Hello world!</h1>
                        </Container>
                    </div>
                </div>
                <div className="row-wrapper">
                    <div className={`row ${classes.requirementContainer}`}>
                        <RequirementsSection 
                            content={requirements}
                        />
                    </div>
                </div>
                <div className="row-wrapper">
                    <div className={`row ${classes.featureContainer}`}>
                        <FeaturesSection 
                            content={features}
                        />
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
};

export default withStyles(styles)(HomeLayout);