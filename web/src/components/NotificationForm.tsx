import * as React from "react";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MuiTextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";

import { ArrowRight } from "../icons/Arrows";


const useStyles = makeStyles((theme: Theme) => ({
    text: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: "32px",
        fontWeight: 700,
        letterSpacing: "0.4%",
        lineHeight: "40px",
        marginBottom: theme.spacing(1),
        "& > .yellow": {
            color: "#FFD644",
            font: "inherit",
        }
    }
}));

const TextField = withStyles({
    root: {
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
    },
})(MuiTextField);

const NotificationForm = () => {
    const classes = useStyles();

    return (
        <Box component="div">
            <Typography variant="body1" className={classes.text}>
                Subscribe to get latest news about&nbsp;
                <Typography variant="body1" className="yellow" component="span">
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
                                    onClick={() => {}}
                                >
                                    <ArrowRight viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
        </Box>
    )
};

export default NotificationForm;