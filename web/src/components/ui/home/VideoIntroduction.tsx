import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: "#231E52",
        height: "100%",
        padding: theme.spacing(20, 12, 20, 12),
        // width: "100%",
    },
    textContainer: {
        marginBottom: theme.spacing(15),
        padding: 0,
    },
    text1: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: 56,
        fontWeight: "bold",
        letterSpacing: "0.4px",
        lineHeight: "64px",
        textTransform: "capitalize",
    },
    text2: {
        color: "#FFD644",
    },
    image: {
        height: "100%",
        objectFit: "cover",
        width: "100%",
    },
    videoContainer: {
        borderRadius: theme.spacing(3),
        position: "relative",
        zIndex: 10,
        [theme.breakpoints.up("xl")]: {
            height: 970,
            overflow: "hidden",
            width: 1728,
        },
    },
    playButtonContainer: {
        height: theme.spacing(20),
        margin: "auto",
        position: "absolute",
        width: theme.spacing(20),
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    },
    playButton: {
        height: "100%",
        position: "relative",
        width: "100%",
    },
    circle: {
        background: "#B3D138",
        borderRadius: "50%",
        height: "100%",
        position: "absolute",
        width: "100%",
    },
    triangle: {
        // borderRadius: 4,
        // borderTop: "50px solid blue",
        // borderLeft: "50px solid red",
        // // borderRight: "50px solid red",
        // borderBottom: "50px solid green",
        margin: "auto",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 51,
        width: 41,
        zIndex: 100,
    },
}));

const VideoIntroductionContainer = styled(Box)(({ theme }) => `
    background: #231E52;
    // box-shadow: 2px -2px 50px 5px rgb(0 0 0 / 50%);
    display: flex;
    filter: drop-shadow(2px -4px 6px black);
    height: 100%;
    justify-content: center;
    padding: ${theme.spacing(20, 12, 20, 12)};
    width: calc(100% - 2 * ${theme.spacing(12)});
`);

const VideoContainer = styled(Box)(({ theme }) => `
    border-radius: ${theme.spacing(3)};
    position: relative;
    z-index: 10;
    
    @media (min-width: 1536px) {
        height: 970px;
        overflow: hidden;
        width: 1713px;
    }
`);

const TextContainer = styled(Box)(({ theme }) => `
    margin-bottom: ${theme.spacing(15)};
    padding: 0;
`);

const HeaderText = styled(Typography)(({ theme }) => `
    color: #FEFEFE;
    font-family: Pangram;
    font-size: ${theme.spacing(7)};
    font-weight: bold;
    letter-spacing: 0.4px;
    line-height: ${theme.spacing(8)};
    text-transform: capitalize;
`);

// className={clsx(classes.root, classes.textContainer)};

const VideoIntroduction = () => {
    const classes = useStyles();
    const [video, swapVideo] = React.useState<boolean>(false);

    return (
        <VideoIntroductionContainer component="div">
            <Box component="div" sx={{ maxWidth: "calc(1920px - 2 * 96px)" }}>
                <TextContainer component="div">
                    <HeaderText variant="h2">
                        What's&nbsp;
                        <HeaderText display="inline" variant="body1" sx={{ color: "#FFD644" }}>
                            inside Mystic Case?
                        </HeaderText>
                    </HeaderText>
                    <HeaderText variant="h2">
                        Let's have a look into Haunted Castle box
                    </HeaderText>
                </TextContainer>
                <VideoContainer component="div">
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
                            <Box component="div" className={classes.playButtonContainer}>
                                <Box component="div" className={classes.playButton}>
                                    <Box component="div" className={classes.circle}></Box>
                                    <Box component="div" className={classes.triangle}>
                                        <svg width="41" height="51" viewBox="0 0 41 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.14751 1.4726C3.48461 -0.221974 0 1.69088 0 4.84724V46.2738C0 49.4302 3.4846 51.3431 6.1475 49.6485L38.697 28.9352C41.167 27.3634 41.167 23.7577 38.697 22.1859L6.14751 1.4726Z" fill="#3A3185"/>
                                        </svg>
                                    </Box>
                                </Box>
                            </Box>
                            <img src="http://i3.ytimg.com/vi/n5AJcAFg54Q/hqdefault.jpg" className={classes.image}/>
                        </React.Fragment> }
                </VideoContainer>
            </Box>
        </VideoIntroductionContainer>
    );
};

export default VideoIntroduction;
