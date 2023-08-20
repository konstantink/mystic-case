import React from "react";

import Container from "@mui/material/Container";

import { Stars } from "@mysticcase/ui";

import styles from "@styles/ui/home/main-scene.module.scss";

export const MainScene = () => {
    return (
        <Container disableGutters className={styles["mc-main-scene-container"]}>
            <img src="/assets/images/small_box.png" alt="box" className={styles["mc-main-scene-box-img"]} />
            <img src="/assets/images/left-ghost.png" alt="ghost_1" className={styles["mc-main-scene-left-ghost"]} />
            <img src="/assets/images/right-ghost.png" alt="ghost_2" className={styles["mc-main-scene-right-ghost"]} />
            <img src="/assets/images/back-ghost.png" alt="ghost_3" className={styles["mc-main-scene-back-ghost"]} />
            <Container disableGutters className={styles["mc-main-scene-background-light"]}> </Container>
            <Stars className={styles["mc-main-scene-star"]} />
        </Container>
    );
};
