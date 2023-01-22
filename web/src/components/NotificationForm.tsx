import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { ArrowRight } from "../icons/Arrows";

const Typography = styled(MuiTypography)(({ theme }) => `
    color: #FEFEFE;
    font-family: Pangram;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0.4%;
    line-height: 40px;
    margin-bottom: ${theme.spacing(1)};

    & > .yellow {
        color: #FFD644;
        font: inherit;
    }
`);

const TextField = styled(MuiTextField)({
    "& .MuiInput-underline": {
        "&:before": {
            borderBottom: "2px solid #938CD160",
        },
        "&:hover:before": {
            borderBottom: "4px solid #938CD1",
        },
        "&:after": {
            borderBottom: "2px solid #FEFEFE",
        },
        "&.Mui-focused:after": {
            boxShadow: "1px 5px 8px rgb(147 140 209 / 90%)",
            borderBottom: "4px solid #FEFEFE",
            transform: "scaleX(1)",
        },
    },
    "& .MuiInput-underline input": {
        color: "#938CD1",
        fontFamily: "Pangram",
        fontSize: "24px",
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "36px",
        paddingBottom: 16,
    },
});

const NotificationForm = () => (
    <Box component="div">
        <Typography variant="body1">
            Subscribe to get latest news about&nbsp;
            <Typography variant="body1" className="yellow" display="inline">
                our boxes
            </Typography>
        </Typography>
        <form method="submit">
            <TextField
                fullWidth
                placeholder="Enter your email address"
                margin="normal"
                type="text"
                value=""
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {} /* eslint-disable-line */}
                            >
                                <ArrowRight viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    </Box>
);

export default NotificationForm;
