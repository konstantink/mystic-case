import React from "react";

import Box from "@mui/material/Box";

import { AnimatedLogo, FacebookLogo, InstagramLogo } from "@mysticcase/ui";

import AnimatedMenuItem from "./AnimatedMenuItem";

import styles from "@styles/layout/header.module.scss";

interface MenuProps extends Object {
    invert?: boolean;
}

type MenuItemName = "home" | "shop" | "contacts" | "log in" | "register" | "cart";

export const Menu = ({ invert }: MenuProps) => {
    const menuItems: Array<MenuItemName> = ["home", "shop", "contacts", "log in", "register", "cart"];
    return (
        <Box component="div" className={styles["mc-header-menu-root"]}>
            {menuItems.map((item, idx) => (
                <AnimatedMenuItem key={`key-${item}`} to={item} timeout={(idx + 1) * 150}>
                    {item}
                </AnimatedMenuItem>
            ))}
            <AnimatedLogo invert={invert} timeout={(menuItems.length + 1) * 150} Component={FacebookLogo} />
            <AnimatedLogo invert={invert} timeout={(menuItems.length + 2) * 150} Component={InstagramLogo} />
        </Box>
    );
};

export default Menu;
