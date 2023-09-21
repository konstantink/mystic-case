import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "@styles/ui/home.module.scss";

export const VideoIntroduction = () => {
    const [video, swapVideo] = React.useState<boolean>(false);

    return (
        <Box className={styles["mc-video-introduction-container"]} component="div">
            <Box component="div">
                <Box className={styles["mc-video-introduction-text-container"]} component="div">
                    <Typography className={styles["mc-video-introduction-text"]} variant="h2">
                        What's&nbsp;
                        <Typography className={`${styles["mc-color-yellow"]} ${styles["mc-video-introduction-text"]}`} display="inline" variant="body1">
                            inside Mystic Case?
                        </Typography>
                    </Typography>
                    <Typography className={styles["mc-video-introduction-text"]} variant="h2">
                        Let's have a look into Haunted Castle box
                    </Typography>
                </Box>
                <Box className={styles["mc-video-introduction-video-container"]} component="div">
                    {video
                        ? <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/n5AJcAFg54Q?modestbranding=0&controls=2&iv_load_policy=3&autoplay=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >
                        </iframe>
                        : <React.Fragment>
                            <Box component="div" style={{ cursor: "pointer", height: "100%", opacity: 0, position: "absolute", width: "100%", zIndex: 1000 }} onClick={() => swapVideo(true)}></Box>
                            <Box component="div" className={styles["mc-video-introduction-play-btn-container"]}>
                                <Box component="div" className={styles["mc-video-introduction-play-btn"]}>
                                    <Box component="div" className={styles["mc-video-introduction-play-circle"]}>
                                        <Box component="div" className={styles["mc-video-introduction-play-triangle"]}>
                                            <svg width="41" height="51" viewBox="0 0 41 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.14751 1.4726C3.48461 -0.221974 0 1.69088 0 4.84724V46.2738C0 49.4302 3.4846 51.3431 6.1475 49.6485L38.697 28.9352C41.167 27.3634 41.167 23.7577 38.697 22.1859L6.14751 1.4726Z" fill="#3A3185"/>
                                            </svg>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </React.Fragment> }
                </Box>
            </Box>
        </Box>
    );
};

export default VideoIntroduction;
