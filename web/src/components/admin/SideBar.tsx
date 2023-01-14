import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StyleOutlined from "@mui/icons-material/StyleOutlined";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { createStyles, withStyles, WithStyles } from "@mui/styles";

// import AdminRoute from "../../containers/admin/AdminRoute";
import { Logo } from "../HomeLayout";
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

type SideBarProps = WithStyles<typeof styles>

export default withStyles(styles)(({ children, classes }: React.PropsWithChildren<SideBarProps>) => {
    const { pathname } = useLocation();

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
                    },
                }}
                variant="permanent"
            >
                <Toolbar style={{ display: "flex", justifyContent: "center" }}>
                    <Logo containerClass={clsx(classes.logoContainer, classes.purple)}/>
                </Toolbar>
                <Divider />
                <nav aria-label="main">
                    <List>
                        <ListItem disablePadding>
                            <NavLink to="/admin/orders" className={({ isActive }) => isActive || /\/admin\/order/.test(pathname) ? "orders-active active" : "inactive"}>
                                <ListItemIcon>
                                    <ShoppingBagOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Orders" disableTypography />
                            </NavLink>
                        </ListItem>
                        <ListItem disablePadding>
                            <NavLink to="/admin/products" className={(params) => params.isActive || /\/admin\/product/.test(pathname) ? "products-active active" : "inactive"}>
                                <ListItemIcon>
                                    <StyleOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Products" disableTypography />
                            </NavLink>
                        </ListItem>
                    </List>
                </nav>
            </Drawer>
            {children}
        </React.Fragment>
    );
});
