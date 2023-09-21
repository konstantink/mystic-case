import * as React from "react";
import { useLocation } from "react-router-dom";

import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";

const NotAuthorized = styled(({ className }: {className?: string}) => {
    const location = useLocation();
    const signInUrl = new URL("/signin", window.location.origin);
    const signUpUrl = new URL("/signup", window.location.origin);
    signInUrl.searchParams.append("to", location.pathname);
    signUpUrl.searchParams.append("to", location.pathname);

    return (
        <div className={className}>
            <span>You're not authorized.</span>
            <span>Do you have an account? Sign in <Link href={signInUrl.href} className="na-link" underline="none" variant="caption">here</Link>.</span>
            <span>Don't have an account yet? Register <Link href={signUpUrl.href} className="na-link" underline="none" variant="caption">here</Link>.</span>
        </div>
    );
})`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 120px 96px 0 96px;
    width: 100%;

    & .na-link {
        font-family: Pangram;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #3A3185;
        text-decoration: none;
    }
`;

export default NotAuthorized;
