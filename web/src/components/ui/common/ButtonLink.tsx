import { Link } from "react-router-dom";

import MuiBox, { BoxProps } from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";

import styles from "@styles/ui/common/button.module.scss";

interface ButtonLinkProps extends BoxProps {
    to: string;
}

export const ButtonLink = ({ children, to }: ButtonLinkProps) => (
    <MuiBox className={styles["mc-button-link"]} component="div">
        <Link to={to}>
            {children}
            <MuiTypography className={styles["mc-button-link-fill"]} variant="button" />
        </Link>
    </MuiBox>
);

export default ButtonLink;
