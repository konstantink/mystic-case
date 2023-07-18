import clsx from "clsx";
import React from "react";

import Box from "@mui/material/Box";

import { Menu } from "@mysticcase/ui";

import styles from "@styles/layout/header.module.scss";

interface LogoProps {
    containerClass: string;
}

export const Logo: React.FunctionComponent<LogoProps> = ({ containerClass }: LogoProps) => {
    return (
        <div className={containerClass}>
            <img src="/assets/logo.png" alt="logo" />
        </div>
    );
};

interface HeaderProps extends Object {
    invert?: boolean;
}

export const Header = ({ invert = false }: HeaderProps) => {
    return (
        <React.Fragment>
            <header className={styles["mc-header"]}>
                <Box component="div">
                    <Logo containerClass={clsx(styles["mc-logo-container"], invert ? styles["mc-purple"] : styles["mc-white"])}/>
                </Box>
                <Menu invert={invert} />
            </header>
        </React.Fragment>
    );
};
