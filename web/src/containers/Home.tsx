import React from "react"

import { createStyles, Theme } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

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