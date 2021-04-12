import React from "react";
import { Link } from "react-router-dom";

import { createStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from "@material-ui/styles";

import SignUpForm, { SignUpText } from "../components/SignUpForm";
import WelcomeLayout from "../components/WelcomeLayout";


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