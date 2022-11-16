import React from "react";
import { Link } from "react-router-dom";

import { Theme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { createStyles, withStyles, WithStyles } from "@mui/styles";

import SignUpForm, { SignUpText } from "../components/SignUpForm";
import { WelcomeLayout } from "../components/WelcomeLayout";


interface SignUpProps extends WithStyles<typeof styles> { };

const styles = (theme: Theme) => createStyles({
    root: {
        height: "100vh",
        margin: "auto",
        display: "flex",
    }
})

const SignUp: React.FunctionComponent<SignUpProps> = ({ classes }: SignUpProps) => {
    return (
        <React.Fragment>
            <div className={classes.root}>
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
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(SignUp);