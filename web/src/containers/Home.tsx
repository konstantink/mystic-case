import React from "react"

import { Theme } from "@mui/material/styles";
import { createStyles, withStyles, WithStyles } from "@mui/styles";

import HomeLayout from "../components/HomeLayout";

interface HomeProps extends WithStyles<typeof styles> { };

const styles = (theme: Theme) => createStyles({

});

const Home: React.FunctionComponent<HomeProps> = ({ classes }: HomeProps) => {
    return (
        <React.Fragment>
            <HomeLayout />
        </React.Fragment>
    )
};

export default withStyles(styles)(Home);