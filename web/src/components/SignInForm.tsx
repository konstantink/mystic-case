import React from "react";

import { Link } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined"
import { createStyles, withStyles, WithStyles } from "@mui/styles";

// import { AuthParams, tryLogin } from "../api";
import { useAuth } from "../hooks/useAuth";
import { AuthParams } from "../types";


const styles = (theme: Theme) => createStyles({
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        // margin: "16px 32px 48px 32px",
        width: "100%",
    },
    loginText: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: 56,
        fontStyle: "normal",
        fontWeight: "bold",
        letterSpacing: 0.4,
        lineHeight: `${theme.spacing(8)}px`,
        marginBottom: theme.spacing(1.5),
    },
    textField: {
        background: "#fff",
        borderRadius: theme.spacing(2),
        // marginTop: "4px",
        flexDirection: "row",
        height: 80,
        marginBottom: theme.spacing(4),
        '&:first-child': {
            marginTop: theme.spacing(7),
        },
        '&:nth-child(2)': {
            marginBottom: theme.spacing(2),
        },
        "& fieldset": {
            border: "2px solid #E1E1E1",
        },
        // '&:not(:last-child)': {
        //     marginBottom: 24,
        // },
        '& .Mui-focused svg': {
            color: "#3f51b5",
        },
    },
    inputLabel: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: 20,
        "& span": {
            color: "red",
        },
    },
    input: {
        // border: "2px solid #E1E1E1",
        borderRadius: theme.spacing(2),
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: 20,
    },
    txt1: {
        // fontFamily: "Dosis, Streetvertising, sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "1.5",
        color: "#666666",
    },
    submit: {
        margin: theme.spacing(3, 'auto', 2),
        [theme.breakpoints.down('md')]:{
            // margin: theme.spacing(7.5, 0, 2),
            marginTop: theme.spacing(7.5),
        }
    },
    link: {
        color: "#666666",
        textDecoration: "none",
    },
})

const signUpTextStyles = (theme: Theme) => createStyles({
    txt1: {
        // fontFamily: "Dosis, Streetvertising, sans-serif",
        fontFamily: "Pangram",
        fontSize: 24,
        fontWeight: 400,
        lineHeight: "1.5",
        color: "#848484",
        "& a, a:visited": {
            color: "#3A3185",
            textDecoration: "none",
        }
    },
})

const checkboxStyles = (theme: Theme) => createStyles({
    root: {
        color: "#E1E1E1",
        fontFamily: "Pangram"
    },
    label: {
        color: "#848484",
        fontFamily: "Pangram",
        fontSize: "20px",
        lineHeight: "30px",
        letterSpacing: "0.3px",
    },
    container: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        "& a, a:visited": {
            color: "#3A3185",
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: "0.3px",
            textDecoration: "none",
        }
    }
});

const buttonStyles = (theme: Theme) => createStyles({
    root: {
        color: "#3A3185",
        backgroundColor: "#B3D138",
        borderRadius: 999,
        fontFamily: "Pangram",
        fontSize: 32,
        fontWeight: 900,
        height: 80,
        letterSpacing: "0.6px",
        lineHeight: "32px",
        width: 260,
        "&:hover": {
            backgroundColor: "#9FBE24",
        }
    }
});

const SignUpText = withStyles(signUpTextStyles)(({ classes }: WithStyles<typeof signUpTextStyles>) => {
    return (
        <Typography variant="body1" className={classes.txt1}>
            Don&apos;t have an account? &nbsp;
            <Link to="/admin/signup">Register</Link>
        </Typography>
    )
});

const RememberForgot = withStyles(checkboxStyles)(({ classes }: WithStyles<typeof checkboxStyles>) => {
    return (
        <Container className={classes.container} disableGutters>
            <FormControlLabel
                control={
                    <Checkbox 
                        checked={false}
                        classes={classes}
                        name="rememberMe"
                    />
                }
                classes={classes}
                label="Remember me"
            />
            <Link to="/">Forgot your password?</Link>
        </Container>
    )
})

const ColorButton = withStyles(buttonStyles)(Button);

const SignInForm: React.FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
    // const usernameRef = React.useRef<HTMLInputElement>(null);
    // const passwordRef = React.useRef<HTMLInputElement>(null);
    const { login } = useAuth();

    const [credentials, setCredential] = React.useState<AuthParams>({
        username: '',
        password: '',
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const name = e.target.name;
        const value = e.target.value;
        setCredential(state => ({
            ...state,
            [name]: value,
        }));
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = async e => {
        e.preventDefault();
        login(credentials.username, credentials.password);
        // try {
        //     const data = await tryLogin(credentials);
        //     console.log(data);
        //     if (data.success) {
        //         localStorage.setItem("at", data.access_token);
        //         localStorage.setItem("rt", data.refresh_token);
        //     }
        // } catch (exc) {
        //     console.log("failed", exc);
        // }
    }

    return (
        <React.Fragment>
            <Typography component="h2" variant="h2" className={classes.loginText}>
                Log In
            </Typography>
            <SignUpText />
            <form method="submit" className={classes.form} onSubmit={onSubmit}>
                <TextField 
                    className={classes.textField}
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="text"
                    required
                    value={credentials.username}
                    variant="outlined"
                    inputProps={{
                        name: 'username'
                    }}
                    InputProps={{
                        className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined fontSize="small"  />
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        className: classes.inputLabel,
                    }}
                    onChange={onChange}
                />
                <TextField 
                    className={classes.textField}
                    fullWidth
                    label="Password"
                    margin="normal"
                    required
                    type="password"
                    value={credentials.password}
                    variant="outlined"
                    inputProps={{
                        name: 'password'
                    }}
                    InputProps={{
                        className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        className: classes.inputLabel,
                    }}
                    onChange={onChange}
                />
                <RememberForgot />
                <ColorButton
                    className={classes.submit}
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Continue
                </ColorButton>
            </form>
        </React.Fragment>
    )
}

export default withStyles(styles)(SignInForm);