import React from "react";

import { createStyles, Theme } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import WelcomeLayout from "../components/WelcomeLayout";
import SignInForm from "../components/SignInForm";


interface SignInProps extends WithStyles<typeof styles> { };

const styles = (theme: Theme) => createStyles({
    root: {
        height: "100vh",
        margin: "auto",
        display: "flex",
    }
})

const SignIn: React.FunctionComponent<SignInProps> = ({ classes }: SignInProps) => {
    return (
        <React.Fragment>
            <div className={classes.root}>
                <WelcomeLayout>
                    <SignInForm />
                </WelcomeLayout>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(SignIn);