import React from "react";

import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { createStyles, withStyles, WithStyles } from "@mui/styles";

// import { createAccount } from "../api/auth";

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
    textField: {
        background: "#fff",
        marginTop: "4px",
        marginBottom: theme.spacing(2),
        flexDirection: "row",
        "&:first-child": {
            marginTop: theme.spacing(5),
        },
        // "&:not(:last-child)": {
        //     marginBottom: 16,
        // },
        "& .Mui-focused svg": {
            color: "#3f51b5",
        },
    },
    txt1: {
        // fontFamily: "Dosis, Streetvertising, sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "1.5",
        color: "#666666",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(1.5, 0, 2),
        },
    },
    link: {
        color: "#666666",
        textDecoration: "none",
    },
});

const signUpTextStyles = () => createStyles({
    txt1: {
        // fontFamily: "Dosis, Streetvertising, sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "1.5",
        color: "#666666",
    },
});

export const SignUpText = withStyles(signUpTextStyles)(({ classes }: WithStyles<typeof signUpTextStyles>) => {
    return (
        <div className="text-center p-t-115">
            <span className={classes.txt1}>
                Don&apos;t have an account? &nbsp;
                <Link to="/admin/signup">Sign up</Link>
            </span>
        </div>
    );
});

const SignUpForm: React.FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
    // const [credentials, setCredential] = React.useState<AuthParams>({
    //     username: "",
    //     password: "",
    // });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log("Name:", name, "Value:", value);
        // setCredential(state => ({
        //     ...state,
        //     [name]: value,
        // }));
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = e => {
        e.preventDefault();
        // tryLogin(credentials).then((response) => {
        //     console.log(response);
        // }).catch(() => {
        //     console.log("failed");
        // })
    };

    return (
        <React.Fragment>
            <Avatar className={classes.avatar}>
                {/* <LockOutlined /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
                Create account
            </Typography>
            <form method="submit" className={classes.form} onSubmit={onSubmit}>
                {/* <TextField
                    className={classes.textField}
                    fullWidth
                    label="First name"
                    margin="dense"
                    type="text"
                    variant="outlined"
                    inputProps={{
                        name: "firstName",
                    }}
                    onChange={onChange}
                /> */}
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="Email"
                    margin="dense"
                    type="text"
                    // value={credentials.username}
                    variant="outlined"
                    inputProps={{
                        name: "email",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    onChange={onChange}
                />
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="Password"
                    margin="dense"
                    type="password"
                    // value={credentials.password}
                    variant="outlined"
                    inputProps={{
                        name: "password",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    onChange={onChange}
                />
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="Confirm password"
                    margin="dense"
                    type="password"
                    // value={credentials.password}
                    variant="outlined"
                    inputProps={{
                        name: "confirmPassword",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    onChange={onChange}
                />
                <Button
                    className={classes.submit}
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Sign up
                </Button>
            </form>
        </React.Fragment>
    );
};

export default withStyles(styles)(SignUpForm);
