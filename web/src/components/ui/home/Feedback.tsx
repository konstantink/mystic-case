import * as React from "react";
import { useSpringCarousel } from "react-spring-carousel-js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ArrowLeft, ArrowRight } from "@mysticcase/icons/Arrows";
import { AvatarGirl1, AvatarGirl2, AvatarMan1, AvatarMan2, AvatarMan3 } from "@mysticcase/icons/Avatars";
import { FunctionComponent } from "react";

import styles from "@styles/ui/home/home.module.scss";

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

interface FeedbackProps {
    avatar: FunctionComponent<{ className: string }>;
    name: string;
    from: string;
    comment: string;
}

const Feedback = ({ avatar, name, from, comment }: FeedbackProps) => (
    <Box className={styles["mc-fb-feedback-container"]} component="div">
        <Box component="div" className={styles["mc-fb-c-avatar-container"]}>
            {React.createElement(avatar, { className: styles["mc-fb-c-avatar"] })}
        </Box>
        <Box component="div" display="flex" flexDirection="column" paddingLeft="80px">
            <Typography variant="body1" className={styles["mc-fb-c-name"]}>
                {name}
                <Typography variant="body1" className={styles["mc-fb-c-city"]} component="span">
                    ({from})
                </Typography>
            </Typography>
            <Typography variant="body2" className={styles["mc-fb-c-text"]}>
                {comment}
            </Typography>
        </Box>
    </Box>
);

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

export const FeedbackSection = () => {
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
        <React.Fragment>
            <Box className={styles["mc-fb-container"]} component="div">
                <Box component="div" className={styles["mc-fb-stickers-container"]}>
                    <Box component="div" className={`${styles["mc-fb-image-container"]} ${styles["mc-fb-image"]} ${styles["mc-fb-purple-border"]} ${styles["mc-fb-first"]}`}>
                        <img src="/assets/images/feedback_1.webp" alt="group_of_people" />
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-text-container"]} ${styles["mc-fb-plot"]}`}>
                        <Typography variant="body1" className={styles["mc-fb-text"]}>
                            Exciting plot with logical and interactive tasks
                        </Typography>
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-text-container"]} ${styles["mc-fb-hints"]}`}>
                        <Typography variant="body1" className={styles["mc-fb-text"]}>
                            Detailed hints for every stage if you're stuck
                        </Typography>
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-image-container"]} ${styles["mc-fb-image"]} ${styles["mc-fb-light-green-border"]} ${styles["mc-fb-second"]}`}>
                        <img src="/assets/images/feedback_2.png" alt="girl_1" />
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-image-container"]} ${styles["mc-fb-image"]} ${styles["mc-fb-light-purple-border"]} ${styles["mc-fb-third"]}`}>
                        <img src="/assets/images/feedback_3.png" alt="family" />
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-text-container"]} ${styles["mc-fb-clues"]}`}>
                        <Typography variant="body1" className={styles["mc-fb-text"]}>
                            Clues, cyphers, tasks, puzzles and codes
                        </Typography>
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-image-container"]} ${styles["mc-fb-image"]} ${styles["mc-fb-yellow-border"]} ${styles["mc-fb-forth"]}`}>
                        <img src="/assets/images/feedback_4.png" alt="girl_2" />
                    </Box>
                    <Box component="div" className={`${styles["mc-fb-text-container"]} ${styles["mc-fb-objects"]}`}>
                        <Typography variant="body1" className={styles["mc-fb-text"]}>
                            Various objects and tools
                        </Typography>
                    </Box>
                </Box>
                <Box component="div" className={styles["mc-fb-feedbacks-container"]}>
                    <Box className={styles["mc-fb-feedbacks-arrow"]} component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToPrevItem} className={styles["mc-fb-nav-buttons"]} variant="contained" color="primary">
                            <ArrowLeft viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                        </Button>
                    </Box>
                    {carouselFragment}
                    <Box className={styles["mc-fb-feedbacks-arrow"]} component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToNextItem} className={styles["mc-fb-nav-buttons"]} variant="contained" color="primary">
                            <ArrowRight viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit"/>
                        </Button>
                    </Box>
                    <Box component="div" gridColumn={2} width="100%" className={styles["mc-fb-dots-wrapper"]}>
                        {thumbsFragment}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default FeedbackSection;
