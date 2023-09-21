import React from "react";
import { Link } from "react-router-dom";

import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import { createStyles, withStyles, WithStyles } from "@mui/styles";

import SignUpForm, { SignUpText } from "../components/SignUpForm";
import { WelcomeLayout } from "../components/WelcomeLayout";

// type SignUpProps = WithStyles<typeof styles>;

// const styles = (theme: Theme) => createStyles({
//     root: {
//         height: "100vh",
//         margin: "auto",
//         display: "flex",
//     },
// });

const SignUp: React.FunctionComponent<BoxProps> = ({ className }: BoxProps) => {
    return (
        <Box className={className}>
            <WelcomeLayout>
                <SignUpForm />
                <Grid container>
                    <Grid item xs>
                        <Typography variant="body2" color="textSecondary">
                            <Link to="/" color="inherit">
                                Forgot password?
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item >
                        <SignUpText />
                    </Grid>
                </Grid>
            </WelcomeLayout>
        </Box>
    );
};

export default styled(SignUp)(() => ({
    height: "100vh",
    margin: "auto",
    display: "flex",
}));
