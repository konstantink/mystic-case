import * as React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createStyles, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { withStyles, WithStyles } from "@mui/styles";

// import AdminRoute from "../../containers/admin/AdminRoute";
import { Logo } from "../HomeLayout";
import { adminRoutes } from "../../routes";
import clsx from "clsx";

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    logoContainer: {
        height: 64,
        "& img": {
            height: "100%",
            width: "100%",
        },
        paddingBottom: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
    },
    purple: {
        filter: "brightness(1)",
    },
    white: {
        filter: "brightness(0) invert(1)",
    },
});

interface SideBarProps extends WithStyles<typeof styles> { }

export default withStyles(styles)(({ children, classes }: React.PropsWithChildren<SideBarProps>) => {
    const { path, url } = useRouteMatch();
    console.log(path, url);
    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    }
                }}
                variant="permanent"
            >
                <Toolbar style={{display: "flex", justifyContent: "center"}}>
                    <Logo containerClass={clsx(classes.logoContainer, classes.purple)}/>
                </Toolbar>
                <Divider />
                <List>
                    {adminRoutes.filter(item => item.name !== undefined).map((route, idx) => (
                        <ListItem key={`admin-route-idx-${idx}`}>
                            <NavLink to={`${url}${route.path}`}>{route.name}</NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {children}
        </React.Fragment>
    )
});