import React from "react";

import { animated, config, useTransition } from "@react-spring/web";

import MenuItem, { MenuItemProps } from "./MenuItem";

import styles from "@styles/layout/header.module.scss";

interface AnimatedMenuItemProps extends MenuItemProps {
    timeout: number;
}

export const AnimatedMenuItem = ({ children, to, timeout }: React.PropsWithChildren<AnimatedMenuItemProps>) => {
    // const classes = menuItemStyles();
    const transitions = useTransition(true, {
        from: { transform: "scale(0)" },
        enter: { transform: "scale(1)", delay: timeout },
        config: config.gentle,
    });

    return (
        <React.Fragment>
            {transitions((animationStyles, item) => item && (
                <animated.div className={styles["mc-header-menu-item-container"]} style={animationStyles}>
                    <MenuItem to={to}>
                        {children}
                    </MenuItem>
                </animated.div>
            ))}
        </React.Fragment>
    );
};

export default AnimatedMenuItem;
