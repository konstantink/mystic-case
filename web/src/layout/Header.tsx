import clsx from "clsx";
import React from "react";

import Box from "@mui/material/Box";

import { Menu } from "@mysticcase/ui";
import Logo from "@mysticcase/icons/Logo";

import styles from "@styles/layout/header.module.scss";

interface HeaderProps extends Object {
    invert?: boolean;
}

export const Header = ({ invert = false }: HeaderProps) => {
    return (
        <React.Fragment>
            <header className={styles["mc-header"]}>
                <Box component="div">
                    <Logo className={clsx(styles["mc-logo-container"], invert ? styles["mc-purple"] : styles["mc-white"])}/>
                </Box>
                <Menu invert={invert} />
            </header>
        </React.Fragment>
    );
};

export default Header;
