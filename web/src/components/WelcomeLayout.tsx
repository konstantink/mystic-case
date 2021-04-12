import React from "react";

import { Link } from "react-router-dom";
import { createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from "@material-ui/styles";


const styles = (theme: Theme) => createStyles({
    root: {
        height: "56vh",
        margin: "7.5% auto 0 auto",
        // padding: "32px 48px",
        display: "flex",
        // flexDirection: "column",
        width: "50%",
        [theme.breakpoints.down('sm')]: {
        // '@media (max-width: 400px)': {
            height: "100%",
            width: "100%",
            display: "flex",
            margin: 0,
            // flexDirection: "column",
        },
    },
    // '@media (min-width: 560px)':{
    //     root: {
    //         height: "100%",
    //         width: "100%",
    //         display: "flex",
    //         flexDirection: "column",
    //     }
    // },
    authFormTitle: {
        display: 'block',
        fontFamily: 'Streetvertising, Dosis',
        fontSize: 38,
        fontWeight: 400,
        lineHeight: '1.5',
        textAlign: 'center',
        textShadow: '1px 1px #666666',
    },
    description: {
        fontFamily: 'Streetvertising, Dosis',
    },
    welcomePart: {
        height: "100%",
        overflow: "hidden",
        padding: theme.spacing(6, 4),
        position: "relative",
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    background: {
        '&::after': {
            backgroundImage: "url('https://subbly-bucket.storage.googleapis.com/userFiles/mystic-case-5ecd78619126f/images/logo.png?v=1590686539')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            content: '""',
            height: "100%",
            left: 0,
            opacity: 0.1,
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 1,
        },
    },
    formPart: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        margin: "auto",
        padding: theme.spacing(6, 4),
        width: "80%",
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(6, 0),
        },
    },
    link: {
        color: "#666666",
        textDecoration: "none",
    },
    logo: {
        display: "none",
        [theme.breakpoints.down('xs')]: {
            backgroundImage: "url('https://subbly-bucket.storage.googleapis.com/userFiles/mystic-case-5ecd78619126f/images/logo.png?v=1590686539')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: theme.palette.type === 'light' ? "#fff" : theme.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            display: "block",
            height: "100%",
            margin: theme.spacing(6),
            width: "100%",
        },
    },
});

const GreetingText: React.FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div>
            <span className={classes.authFormTitle}>Welcome to</span>
            <span className={classes.authFormTitle}>
                Mystic Case
            </span>
      </div>
    )
}

const Copyright: React.FunctionComponent<{ className: string }> = ({ className }) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/" className={className}>
                Mystic Case
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
};

const Logo: React.FunctionComponent<{ className: string }> = ({ className }) => {
    return (
        <React.Fragment>
            <div className={className}></div>
        </React.Fragment>
    )
}

interface WelcomeProps extends WithStyles<typeof styles> {
    // children: []]React.ReactElement,
}

const WelcomeLayout: React.FunctionComponent<WelcomeProps> = ({ classes, children }) => {
    return (
        <React.Fragment>
            {/* <Paper className={classes.root} variant="outlined"> */}
                <Grid container component={Paper} className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={5}>
                        <div className={`${classes.background} ${classes.welcomePart}`}>
                            <GreetingText classes={classes} />
                            <Box mt={5}>
                                <Typography variant="h5" color="textSecondary" align="center" className={classes.description}>
                                    A single place for all your inventory
                                </Typography>
                            </Box>
                            <Box mt={3}>
                                <Typography variant="body1" color="textSecondary" align="center" className={classes.description}>
                                    Be aware of everything that is going on in your warehouse, don't miss the point to refill your storage and be ready for high load
                                </Typography>
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                        <div className={classes.formPart}>
                            {children}
                            {/* <SignInForm /> */}
                            {/* <Avatar className={classes.avatar}>
                                <LockOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography> */}
                            <Logo className={classes.logo} />
                            <Box mt={5}>
                                <Copyright className={classes.link}/>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            {/* </Paper> */}
        </React.Fragment>
    )
}

export default withStyles(styles)(WelcomeLayout);