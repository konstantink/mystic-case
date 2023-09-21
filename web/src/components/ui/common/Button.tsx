import "react";

import MuiButton, { ButtonProps } from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const buttonTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#B3D138",
                    borderRadius: 80,
                    color: "#3A3185",
                    fontFamily: "Pangram",
                    fontSize: 32,
                    fontWeight: 900,
                    lineHeight: "32px",
                    letterSpacing: "0.6px",
                    padding: "24px 40px",
                    position: "relative",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    "&:hover": {
                        backgroundColor: "#9FBD24",
                    },
                },
                outlined: {
                    backgroundColor: "#E5E5E5",
                    border: "4px solid #938CD1",
                    // borderRadius: theme.spacing(10),
                    "&:hover": {
                        backgroundColor: "#DBDBDB",
                    },
                },
            },
        },
    },
});

export const Button = ({ children, disableElevation = true, disableRipple = false, ...props }: ButtonProps) => (
    <ThemeProvider theme={buttonTheme}>
        <MuiButton disableElevation={disableElevation} disableRipple={disableRipple} {...props}>
            {children}
        </MuiButton>
    </ThemeProvider>
);
