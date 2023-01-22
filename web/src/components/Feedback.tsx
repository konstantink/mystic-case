import * as React from "react";
import { useSpringCarousel } from "react-spring-carousel-js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

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

const FeedbackSectionContainer = styled(Box)(({ theme }) => `
    align-items: center;
    background: #231E52;
    display: flex;
    filter: drop-shadow(2px -4px 6px black);
    flex-direction: column;
    padding: ${theme.spacing(21, 12)};
    width: 100%;

    & .fb-stickers-container {
        display: flex;
        flex-direction: row;
        height: ${theme.spacing(90)};
        max-width: calc(1920px - 2 * ${theme.spacing(12)});
        position: relative;

        & .fb-image-container {
            border: 8px solid;
            border-radius: ${theme.spacing(3)};
            overflow: hidden;
            position: absolute;
        }

        & .fb-image img {
            height: 100%;
            object-fit: cover;
            width: 100%;
        }

        & .fb-purple-border {
            border-color: #5B4DD1;
        }

        & .fb-light-purple-border {
            border-color: #938CD1
        }

        & .fb-light-green-border {
            border-color: #B3D138;
        }

        & .fb-yellow-border {
            border-color: #FFD644;
        }

        & .fb-first {
            bottom: ${theme.spacing(12)};
            height: ${theme.spacing(45)}; // 535,
            left: ${theme.spacing(-3.5)};
            transform: matrix(0.89, 0.46, -0.46, 0.89, 0, 0);
            z-index: 10;
            width: ${theme.spacing(59.5)}; // 430
            & img {
                object-position: 20% 50%;
            }
        }

        & .fb-second {
            height: ${theme.spacing(57.5)}; // 535,
            left: ${theme.spacing(70.5)};
            top: ${theme.spacing(5)};
            transform: matrix(0.95, -0.3, 0.3, 0.95, 0, 0);
            z-index: 15;
            width: ${theme.spacing(43)}; // 430
            & img {
                object-fit: none;
                object-position: 50% 60%;
            }
        }

        & .fb-third {
            bottom: ${theme.spacing(5)};
            height: ${theme.spacing(43)}; // 535,
            right: ${theme.spacing(52.5)};
            transform: matrix(0.99, -0.14, 0.14, 0.99, 0, 0);
            z-index: 15;
            width: ${theme.spacing(57.5)}; // 430
        }

        & .fb-forth {
            top: ${theme.spacing(6)};
            height: ${theme.spacing(59.5)}; // 535,
            right: ${theme.spacing(0)};
            transform: matrix(0.95, -0.31, 0.31, 0.95, 0, 0);
            z-index: 15;
            width: ${theme.spacing(43)}; // 430
            & img {
                object-fit: none;
                object-position: 50% 65%;
            }
        }

        & .fb-text-container {
            align-items: flex-end;
            border-radius: ${theme.spacing(3)};
            display: flex;
            height: ${theme.spacing(39)};
            padding: ${theme.spacing(3)};
            position: absolute;
            width: ${theme.spacing(39)};
        }

        & .fb-plot {
            background: #938CD1;
            left: ${theme.spacing(22.25)};
            top: ${theme.spacing(5.5)};
            transform: matrix(1, -0.07, 0.07, 1, 0, 0);
            z-index: 20;
        }

        & .fb-hints {
            background: #FFD644;
            bottom: ${theme.spacing(7)};
            left: ${theme.spacing(54)};
            transform: matrix(0.99, -0.12, 0.12, 0.99, 0, 0);
        }

        & .fb-clues {
            background: #B3D138;
            right: ${theme.spacing(49)};
            top: ${theme.spacing(3)};
            transform: matrix(0.98, 0.22, -0.22, 0.98, 0, 0);
            z-index: 20;
        }

        & .fb-objects {
            background: #5B4DD1;
            bottom: ${theme.spacing(7)};
            right: ${theme.spacing(10)};
            transform: matrix(0.99, 0.11, -0.11, 0.99, 0, 0);
            z-index: 10;
        }

        & .fb-text {
            color: #000;
            font-family: Pangram;
            font-size: ${theme.spacing(4)};
            font-weight: 900;
            letter-spacing: 0.6px;
            line-height: 32px;
            text-transform: uppercase;
        }
    }

    & .fb-feedback-container {
        display: grid;
        grid-template-columns: 96px 1fr 96px;
        grid-row-gap: ${theme.spacing(3)};
        margin-top: ${theme.spacing(15)};
        max-width: calc(1920px - 2 * ${theme.spacing(12)});

        .fb-nav-buttons {
            border-radius: ${theme.spacing(6)};
            font-size: ${theme.spacing(5)};
            height: ${theme.spacing(12)};
            width: ${theme.spacing(12)};
        }

        .fb-dots-wrapper {
            &>div {
                display: flex
                flex-direction: row;
                justify-content: center;
            }
            &>div>div:not(:last-of-type) {
                margin-right: ${theme.spacing(1)};
            }
        }
    }
`);

const FeedbackContainer = styled(Box)(({ theme }) => `
    display: grid;
    grid-template-columns: 140px 1fr;
    padding: ${theme.spacing(0, 25)};

    .fb-c-avatar {
        height: 100%;
        width: 100%;
    }

    .fb-c-avatar-container {
        height: ${theme.spacing(17.5)};
        width: ${theme.spacing(17.5)}
    }

    .fb-c-name {
        color: #B3D138;
        font-family: Pangram;
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 0.3px;
        line-height: 24px;
        margin-bottom: ${theme.spacing(2.5)};
        text-transform: uppercase;
        & .fb-c-city {
            margin-left: ${theme.spacing(2)};
        }
    }

    .fb-c-city {
        color: #938CD1;
        font-family: Pangram;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 28px;
        text-transform: none;
    }

    .fb-c-text {
        color: #FEFEFE;
        font-family: Pangram;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 36px;
        text-transform: none;
    }
`);

interface FeedbackProps {
    avatar: FunctionComponent<{ className: string }>;
    name: string;
    from: string;
    comment: string;
}

const Feedback = ({ avatar, name, from, comment }: FeedbackProps) => (
    <FeedbackContainer component="div">
        <Box component="div" className="fb-c-avatar-container">
            {React.createElement(avatar, { className: "fb-c-avatar" })}
        </Box>
        <Box component="div" display="flex" flexDirection="column" paddingLeft="80px">
            <Typography variant="body1" className="fb-c-name">
                {name}
                <Typography variant="body1" className="fb-c-city" component="span">
                    ({from})
                </Typography>
            </Typography>
            <Typography variant="body2" className="fb-c-text">
                {comment}
            </Typography>
        </Box>
    </FeedbackContainer>
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

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: "rgba(147,140,209,0.3)",
        },
    },
});

const FeedbackSection = () => {
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
        <ThemeProvider theme={buttonTheme}>
            <FeedbackSectionContainer component="div">
                <Box component="div" className="fb-stickers-container">
                    <Box component="div" className="fb-image-container fb-image fb-purple-border fb-first">
                        <img src="/assets/images/feedback_1.webp" alt="group_of_people" />
                    </Box>
                    <Box component="div" className="fb-text-container fb-plot">
                        <Typography variant="body1" className="fb-text">
                            Exciting plot with logical and interactive tasks
                        </Typography>
                    </Box>
                    <Box component="div" className="fb-text-container fb-hints">
                        <Typography variant="body1" className="fb-text">
                            Detailed hints for every stage if you're stuck
                        </Typography>
                    </Box>
                    <Box component="div" className="fb-image-container fb-image fb-light-green-border fb-second">
                        <img src="/assets/images/feedback_2.png" alt="girl_1" />
                    </Box>
                    <Box component="div" className="fb-image-container fb-image fb-light-purple-border fb-third">
                        <img src="/assets/images/feedback_3.png" alt="family" />
                    </Box>
                    <Box component="div" className="fb-text-container fb-clues">
                        <Typography variant="body1" className="fb-text">
                            Clues, cyphers, tasks, puzzles and codes
                        </Typography>
                    </Box>
                    <Box component="div" className="fb-image-container fb-image fb-yellow-border fb-forth">
                        <img src="/assets/images/feedback_4.png" alt="girl_2" />
                    </Box>
                    <Box component="div" className="fb-text-container fb-objects">
                        <Typography variant="body1" className="fb-text">
                            Various objects and tools
                        </Typography>
                    </Box>
                </Box>
                <Box component="div" className="fb-feedback-container">
                    <Box component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToPrevItem} className="fb-nav-buttons" variant="contained" color="primary">
                            <ArrowLeft viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit" />
                        </Button>
                    </Box>
                    {carouselFragment}
                    <Box component="div" display="flex" alignItems="center">
                        <Button onClick={api.slideToNextItem} className="fb-nav-buttons" variant="contained" color="primary">
                            <ArrowRight viewBox="0 0 40 22" fill="#FFFFFF" height={22} width={40} fontSize="inherit"/>
                        </Button>
                    </Box>
                    <Box component="div" gridColumn={2} width="100%" className="fb-dots-wrapper">
                        {thumbsFragment}
                    </Box>
                </Box>
            </FeedbackSectionContainer>
        </ThemeProvider>
    );
};

export default FeedbackSection;
