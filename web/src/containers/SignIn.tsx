import React from "react";

import { styled } from "@mui/material/styles";

import { WelcomeLayout } from "../components/WelcomeLayout";
import SignInForm from "../components/SignInForm";

const SignIn: React.FunctionComponent<{ className?: string }> = ({ className }) => (
    <React.Fragment>
        <div className={className}>
            <WelcomeLayout>
                <SignInForm />
            </WelcomeLayout>
        </div>
    </React.Fragment>
);

export default styled(SignIn)(() => ({
    height: "100vh",
    margin: "auto",
    display: "flex",
}));
