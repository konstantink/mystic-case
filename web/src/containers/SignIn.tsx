import React from "react";

import { Theme } from "@mui/material/styles";
import { createStyles, withStyles, WithStyles } from "@mui/styles";

import { WelcomeLayout } from "../components/WelcomeLayout";
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