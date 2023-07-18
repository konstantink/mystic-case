import clsx from "clsx";
import React from "react";

import { animated, config, useTransition } from "@react-spring/web";

import styles from "@styles/layout/header.module.scss";

type LogoComponent = (props: LogoProps) => React.ReactElement<LogoProps>;

interface LogoProps {
    className?: string;
}

interface AnimatedLogoProps {
    Component: LogoComponent;
    timeout: number;
    invert: boolean;
}

export const Logo: LogoComponent = ({ className }: LogoProps) => {
    return (
        <div className={className}>
            <img src="/assets/logo.png" alt="logo" />
        </div>
    );
};

export const FacebookLogo: LogoComponent = () => (
    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M3.26784 11.2499V19.9999H7.28187V11.2499H10.2795L10.8585 7.62491H7.28187V5.27491C7.28187 4.28741 7.78362 3.32491 9.37895 3.32491H11V0.237408C11 0.237408 9.53333 -9.15527e-05 8.13099 -9.15527e-05C5.1848 -9.15527e-05 3.26784 1.72491 3.26784 4.86241V7.62491H0V11.2499H3.26784Z" fill="none"/>
    </svg>
);

export const InstagramLogo: LogoComponent = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M6.38 0H15.62C19.14 0 22 2.86 22 6.38V15.62C22 17.3121 21.3278 18.9349 20.1313 20.1313C18.9349 21.3278 17.3121 22 15.62 22H6.38C2.86 22 0 19.14 0 15.62V6.38C0 4.68792 0.672177 3.06514 1.86866 1.86866C3.06514 0.672177 4.68792 0 6.38 0ZM6.16 2.2C5.10974 2.2 4.1025 2.61721 3.35986 3.35986C2.61721 4.1025 2.2 5.10974 2.2 6.16V15.84C2.2 18.029 3.971 19.8 6.16 19.8H15.84C16.8903 19.8 17.8975 19.3828 18.6401 18.6401C19.3828 17.8975 19.8 16.8903 19.8 15.84V6.16C19.8 3.971 18.029 2.2 15.84 2.2H6.16ZM16.775 3.85C17.1397 3.85 17.4894 3.99487 17.7473 4.25273C18.0051 4.51059 18.15 4.86033 18.15 5.225C18.15 5.58967 18.0051 5.93941 17.7473 6.19727C17.4894 6.45513 17.1397 6.6 16.775 6.6C16.4103 6.6 16.0606 6.45513 15.8027 6.19727C15.5449 5.93941 15.4 5.58967 15.4 5.225C15.4 4.86033 15.5449 4.51059 15.8027 4.25273C16.0606 3.99487 16.4103 3.85 16.775 3.85ZM11 5.5C12.4587 5.5 13.8576 6.07946 14.8891 7.11091C15.9205 8.14236 16.5 9.54131 16.5 11C16.5 12.4587 15.9205 13.8576 14.8891 14.8891C13.8576 15.9205 12.4587 16.5 11 16.5C9.54131 16.5 8.14236 15.9205 7.11091 14.8891C6.07946 13.8576 5.5 12.4587 5.5 11C5.5 9.54131 6.07946 8.14236 7.11091 7.11091C8.14236 6.07946 9.54131 5.5 11 5.5ZM11 7.7C10.1248 7.7 9.28542 8.04768 8.66655 8.66655C8.04768 9.28542 7.7 10.1248 7.7 11C7.7 11.8752 8.04768 12.7146 8.66655 13.3335C9.28542 13.9523 10.1248 14.3 11 14.3C11.8752 14.3 12.7146 13.9523 13.3335 13.3335C13.9523 12.7146 14.3 11.8752 14.3 11C14.3 10.1248 13.9523 9.28542 13.3335 8.66655C12.7146 8.04768 11.8752 7.7 11 7.7Z" fill="#3A3185"/>
    </svg>
);

export const AnimatedLogo = ({ Component, timeout, invert }: AnimatedLogoProps) => {
    const transitions = useTransition(true, {
        from: { transform: "scale(0)" },
        enter: { transform: "scale(1)", delay: timeout },
        config: config.gentle,
    });

    return (
        <React.Fragment>
            {
                transitions((animatedStyles, item) => item && (
                    <animated.div className={clsx(styles["mc-header-menu-logo-root"], invert ? styles["mc-logo-purple"] : styles["mc-logo-white"])} style={animatedStyles}>
                        <Component />
                    </animated.div>
                ))
            }
        </React.Fragment>
    );
};
