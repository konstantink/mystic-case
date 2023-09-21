import React from "react";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import styles from "@styles/layout/header.module.scss";

export interface MenuItemProps extends Object {
    to: string;
}

export const MenuItem = ({ children, to }: React.PropsWithChildren<MenuItemProps>) => (
    <Typography variant="button" className={to === "shop" ? styles["mc-header-menu-item-bordered"] : ""} component="div">
        <Link to={`/${to}`}>
            {children}
            {to === "shop" && <Typography variant="button" className={styles["mc-header-menu-item-bordered-fill"]} component="span">
            </Typography>}
        </Link>
    </Typography>
);

export default MenuItem;
