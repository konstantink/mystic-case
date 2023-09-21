import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Copyright: React.FC = () => (
    <Typography variant="body2" color="textSecondary" align="center" sx={{ fontFamily: "inherit" }}>
        {"Copyright © "}
        <Link to="/" style={{ color: "#666666", textDecoration: "none" }}>
            Mystic Case
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
    </Typography>
);

const Logo = styled("div")(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("xs")]: {
        backgroundImage: "url('https://subbly-bucket.storage.googleapis.com/userFiles/mystic-case-5ecd78619126f/images/logo.png?v=1590686539')",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.grey[900],
        backgroundSize: "contain",
        backgroundPosition: "center",
        display: "block",
        height: "100%",
        margin: theme.spacing(6),
        width: "100%",
    },
}));

type WelcomeProps = React.PropsWithChildren;

export const WelcomeLayout: React.FC<WelcomeProps> = ({ children }) => {
    return (
        <React.Fragment>
            <Paper
                elevation={6} variant="elevation"
                sx={theme => ({
                    borderRadius: theme.spacing(3),
                    height: 784,
                    margin: "7.5% auto 0 auto",
                    display: "flex",
                    width: 710,
                    [theme.breakpoints.down("sm")]: {
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        margin: 0,
                    },
                })}
            >
                {/* <Grid container component={Paper} className={classes.root}>
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
                    <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square> */}
                <Box
                    component="div"
                    sx={theme => ({
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        padding: theme.spacing(10, 10),
                        width: "100%",
                        [theme.breakpoints.down("xs")]: {
                            padding: theme.spacing(6, 0),
                        },
                    })}
                >
                    {children}
                    {/* <SignInForm /> */}
                    {/* <Avatar className={classes.avatar}>
                                <LockOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography> */}
                    <Logo />
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Box>
                {/* </Grid>
                </Grid> */}
            </Paper>
        </React.Fragment>
    );
};
