import React from "react";

import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined"
import { createStyles, withStyles, WithStyles } from "@material-ui/styles";

import { AuthParams, tryLogin } from "../api";


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
        marginBottom: theme.spacing(3),
        flexDirection: "row",
        '&:first-child': {
            marginTop: 36,
        },
        // '&:not(:last-child)': {
        //     marginBottom: 24,
        // },
        '& .Mui-focused svg': {
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
        margin: theme.spacing(9, 0, 2),
        [theme.breakpoints.down('md')]:{
            margin: theme.spacing(7.5, 0, 2),
        }
    },
    link: {
        color: "#666666",
        textDecoration: "none",
    },
})

const SignUpText: React.FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div className="text-center p-t-115">
            <span className={classes.txt1}>
                Don&apos;t have an account? &nbsp;
                <Link to="/admin/signup">Sign up</Link>
            </span>
        </div>
    )
}

const SignInForm: React.FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
    const [credentials, setCredential] = React.useState<AuthParams>({
        email: '',
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
        await tryLogin(credentials).then((response) => {
            console.log(response);
        }).catch(() => {
            console.log("failed");
        })
    }

    return (
        <React.Fragment>
            <Avatar className={classes.avatar}>
                {/* <AccountCircle /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form method="submit" className={classes.form} onSubmit={onSubmit}>
                <TextField 
                    className={classes.textField}
                    fullWidth
                    label="Email"
                    margin="dense"
                    type="text"
                    value={credentials.email}
                    variant="outlined"
                    inputProps={{
                        name: 'email'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined fontSize="small"  />
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
                    value={credentials.password}
                    variant="outlined"
                    inputProps={{
                        name: 'password'
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
                    Sign in
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="body2" color="textSecondary">
                            <Link to="/" color="inherit">
                                Forgot password?
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SignUpText classes={classes} />
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default withStyles(styles)(SignInForm);