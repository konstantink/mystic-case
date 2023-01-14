import clsx from "clsx";
import * as React from "react";
import { useSpringCarousel } from "react-spring-carousel-js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, Theme } from "@mui/material/styles";
import { makeStyles, ThemeProvider } from "@mui/styles";

import { ArrowLeft, ArrowRight } from "../icons/Arrows";
import { AvatarGirl1, AvatarGirl2, AvatarMan1, AvatarMan2, AvatarMan3 } from "../icons/Avatars";
import { FunctionComponent } from "react";

const feedbacks = [{
    avatar: AvatarMan1,
    name: "Andrew",
    city: "Glasgow, UK",
    comment: "We spent an enjoyable evening solving the Haunted Castle. Getting to the bottom of the mystery was very satisfying. Loved the wooden clues!",
}, {
    avatar: AvatarMan2,
    name: "Steve",
    city: "Livingston, UK",
    comment: "Great collaborative fun for all the family to solve together. Great quality pieces.",
}, {
    avatar: AvatarGirl1,
    name: "Rachael",
    city: "Glasgow, UK",
    comment: "The attention to detail is fantastic and defo worth the money for the fun of playing. If you are a huge gamer and love playing games with friends and family I'd 1000% recommend this to them.",
}, {
    avatar: AvatarMan3,
    name: "Eduardo",
    city: "London, UK",
    comment: "Incredible to improve our mood as a couple! We were cranky from a Saturday of cleaning our flat and after we were laughing and having so much fun!",
}, {
    avatar: AvatarGirl2,
    name: "Jen",
    city: "Llandrindod Wells, UK",
    comment: "We really enjoyed our very first Mystic Case and can't wait for the next one. It took us slightly longer than the 2 hours and we did use some of the clues provided but we all thoroughly enjoyed it. The story of the case was really well thought out and we can't wait to see what else is in store. Also I mentioned we would be playing it for my birthday and the thoughtfulness of the team by including a birthday card was lovely. At first the price may seem expensive but honestly it is worth it and you won't regret it. For a fun family night or maybe a date night, I highly recommend. Thank you Mystic Case",
}];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: "#231E52",
        padding: theme.spacing(21, 12),
    },
    stickersContainer: {
        display: "flex",
        flexDirection: "row",
        height: theme.spacing(90),
        position: "relative",
    },
    feedbackContainer: {
        display: "grid",
        gridTemplateColumns: "96px 1fr 96px",
        gridRowGap: theme.spacing(3),
        marginTop: theme.spacing(15),
    },
    imageContainer: {
        border: "8px solid",
        borderRadius: theme.spacing(3),
        overflow: "hidden",
        position: "absolute",
    },
    image: {
        "& img": {
            height: "100%",
            objectFit: "cover",
            width: "100%",
        },
    },
    purpleBorder: {
        borderColor: "#5B4DD1",
    },
    lightPurpleBorder: {
        borderColor: "#938CD1",
    },
    lightGreenBorder: {
        borderColor: "#B3D138",
    },
    yellowBorder: {
        borderColor: "#FFD644",
    },
    first: {
        bottom: theme.spacing(12),
        height: theme.spacing(45), // 535,
        left: theme.spacing(-3.5),
        transform: "matrix(0.89, 0.46, -0.46, 0.89, 0, 0)",
        zIndex: 10,
        width: theme.spacing(59.5), // 430
        "& img": {
            objectPosition: "20% 50%",
        },
    },
    second: {
        height: theme.spacing(57.5), // 535,
        left: theme.spacing(70.5),
        top: theme.spacing(5),
        transform: "matrix(0.95, -0.3, 0.3, 0.95, 0, 0)",
        zIndex: 15,
        width: theme.spacing(43), // 430
        "& img": {
            objectFit: "none",
            objectPosition: "50% 60%",
        },
    },
    third: {
        bottom: theme.spacing(5),
        height: theme.spacing(43), // 535,
        right: theme.spacing(52.5),
        transform: "matrix(0.99, -0.14, 0.14, 0.99, 0, 0)",
        zIndex: 15,
        width: theme.spacing(57.5), // 430
    },
    forth: {
        top: theme.spacing(6),
        height: theme.spacing(59.5), // 535,
        right: theme.spacing(0),
        transform: "matrix(0.95, -0.31, 0.31, 0.95, 0, 0)",
        zIndex: 15,
        width: theme.spacing(43), // 430
        "& img": {
            objectFit: "none",
            objectPosition: "50% 65%",
        },
    },
    textContainer: {
        alignItems: "flex-end",
        borderRadius: theme.spacing(3),
        display: "flex",
        height: theme.spacing(39),
        padding: theme.spacing(3),
        position: "absolute",
        width: theme.spacing(39),
    },
    plot: {
        background: "#938CD1",
        left: theme.spacing(22.25),
        top: theme.spacing(5.5),
        transform: "matrix(1, -0.07, 0.07, 1, 0, 0)",
        zIndex: 20,
    },
    hints: {
        background: "#FFD644",
        bottom: theme.spacing(7),
        left: theme.spacing(54),
        transform: "matrix(0.99, -0.12, 0.12, 0.99, 0, 0)",
    },
    clues: {
        background: "#B3D138",
        right: theme.spacing(49),
        top: theme.spacing(3),
        transform: "matrix(0.98, 0.22, -0.22, 0.98, 0, 0)",
        zIndex: 20,
    },
    objects: {
        background: "#5B4DD1",
        bottom: theme.spacing(7),
        right: theme.spacing(10),
        transform: "matrix(0.99, 0.11, -0.11, 0.99, 0, 0)",
        zIndex: 10,
    },
    text: {
        color: "#000",
        fontFamily: "Pangram",
        fontSize: theme.spacing(4),
        fontWeight: 900,
        letterSpacing: "0.6px",
        lineHeight: "32px",
        textTransform: "uppercase",
    },
    navButtons: {
        borderRadius: theme.spacing(6),
        fontSize: theme.spacing(5),
        height: theme.spacing(12),
        width: theme.spacing(12),
    },
    dotsWrapper: {
        "&>div": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        "&>div>div:not(:last-child)": {
            marginRight: theme.spacing(1),
        },
    },
}));

const useFeedbackStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(0, 25),
        width: "100%",
    },
    avatar: {
        height: "100%",
        width: "100%",
    },
    avatarContainer: {
        height: theme.spacing(17.5),
        width: theme.spacing(17.5),
    },
    name: {
        color: "#B3D138",
        fontFamily: "Pangram",
        fontSize: "24px",
        fontWeight: 900,
        letterSpacing: "0.3px",
        lineHeight: "24px",
        marginBottom: theme.spacing(2.5),
        textTransform: "uppercase",
        "& $city": {
            marginLeft: theme.spacing(2),
        },
    },
    city: {
        color: "#938CD1",
        fontFamily: "Pangram",
        fontSize: "18px",
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "28px",
        textTransform: "none",
    },
    text: {
        color: "#FEFEFE",
        fontFamily: "Pangram",
        fontSize: "24px",
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "36px",
        textTransform: "none",
    },
}));

interface FeedbackProps {
    avatar: FunctionComponent<{ className: string }>;
    name: string;
    from: string;
    comment: string;
}

const Feedback = ({ avatar, name, from, comment }: FeedbackProps) => {
    const classes = useFeedbackStyles();

    return (
        <Box component="div" className={classes.root} display="grid" gridTemplateColumns="140px 1fr">
            <Box component="div" className={classes.avatarContainer}>
                {React.createElement(avatar, { className: classes.avatar })}
            </Box>
            <Box component="div" display="flex" flexDirection="column" paddingLeft="80px">
                <Typography variant="body1" className={classes.name}>
                    {name}
                    <Typography variant="body1" className={classes.city} component="span">
                        ({from})
                    </Typography>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                    {comment}
                </Typography>
            </Box>
        </Box>
    );
};

interface DotProps {
    active?: boolean;
    onClick: () => void;
}

const Dot = ({ active, onClick }: DotProps) => (
    <Box
        component="div"
        display="inline-block"
        border="1px solid #FEFEFE"
        borderRadius="50%"
        width={16}
        height={16}
        onClick={onClick}
        style={active ? { background: "#FEFEFE" } : { background: "transparent" }}
    >
    </Box>
);

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: "rgba(147,140,209,0.3)",
        },
    },
});

const FeedbackSection = () => {
    const classes = useStyles();
    const [activeItem, setActiveItem] = React.useState<number>(0);
    const { carouselFragment, thumbsFragment, ...api } = useSpringCarousel({
        withThumbs: true,
        withLoop: true,
        items: feedbacks.map((feedback, idx) => ({
            id: `feedback_${idx}`,
            renderItem: <Feedback avatar={feedback.avatar} name={feedback.name} from={feedback.city} comment={feedback.comment} />,
            renderThumb: <Dot active={idx === activeItem} onClick={() => api.slideToItem(`feedback_${idx}`)}/>,
        })),
    });

    React.useEffect(() => {
        const interval: number = window.setInterval(() => {
            api.slideToNextItem();
        }, 3000);

        return () => {
            window.clearInterval(interval);
        };
    }, [api]);

    api.useListenToCustomEvent((data) => {
        switch (data.eventName) {
        case "onSlideStartChange":
            setActiveItem(data.nextItem);
            break;
        default:
            break;
        }
    });

    return (
        <Box component="div" className={classes.root}>
            <Box component="div" className={classes.stickersContainer}>
                <Box component="div" className={clsx(classes.imageContainer, classes.image, classes.purpleBorder, classes.first)}>
                    <img src="/assets/images/feedback_1.webp" alt="group_of_people" />
                </Box>
                <Box component="div" className={clsx(classes.textContainer, classes.plot)}>
                    <Typography variant="body1" className={classes.text}>
                        Exciting plot with logical and interactive tasks
                    </Typography>
                </Box>
                <Box component="div" className={clsx(classes.textContainer, classes.hints)}>
                    <Typography variant="body1" className={classes.text}>
                        Detailed hints for every stage if you're stuck
                    </Typography>
                </Box>
                <Box component="div" className={clsx(classes.imageContainer, classes.image, classes.lightGreenBorder, classes.second)}>
                    <img src="/assets/images/feedback_2.png" alt="girl_1" />
                </Box>
                <Box component="div" className={clsx(classes.imageContainer, classes.image, classes.lightPurpleBorder, classes.third)}>
                    <img src="/assets/images/feedback_3.png" alt="family" />
                </Box>
                <Box component="div" className={clsx(classes.textContainer, classes.clues)}>
                    <Typography variant="body1" className={classes.text}>
                        Clues, cyphers, tasks, puzzles and codes
                    </Typography>
                </Box>
                <Box component="div" className={clsx(classes.imageContainer, classes.image, classes.yellowBorder, classes.forth)}>
                    <img src="/assets/images/feedback_4.png" alt="girl_2" />
                </Box>
                <Box component="div" className={clsx(classes.textContainer, classes.objects)}>
                    <Typography variant="body1" className={classes.text}>
                        Various objects and tools
                    </Typography>
                </Box>
            </Box>
            <Box component="div" className={classes.feedbackContainer}>
                <ThemeProvider theme={buttonTheme}>
                    <Box component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToPrevItem} className={classes.navButtons} variant="contained" color="primary">
                            <ArrowLeft viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                        </Button>
                    </Box>
                </ThemeProvider>
                {carouselFragment}
                <ThemeProvider theme={buttonTheme}>
                    <Box component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToNextItem} className={classes.navButtons} variant="contained" color="primary">
                            <ArrowRight viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit"/>
                        </Button>
                    </Box>
                </ThemeProvider>
                <Box component="div" gridColumn={2} width="100%" className={classes.dotsWrapper}>
                    {thumbsFragment}
                </Box>
            </Box>
        </Box>
    );
};

export default FeedbackSection;
