import * as React from "react";
import { useInView } from "react-intersection-observer";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { animated, config, useTransition } from "@react-spring/web";

export interface Requirement {
    icon: React.ReactElement;
    text: string;
    delay: number;
}

interface RequirementsSectionProps {
    className?: string;
    requirements: Array<Requirement>;
}

const IconContainer = styled(Box)(({ theme }) => `
    margin-bottom: ${theme.spacing(6)};
    & svg {
        height: 160px;
        width: 160px;
    }
`);

interface RequirementViewProps extends Requirement {
    className?: string;
}

const RequirementView = styled(({ className, icon, text, delay }: RequirementViewProps) => {
    const [show, setShow] = React.useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "80px 0px",
    });
    const transitions = useTransition(show, {
        from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
        enter: { opacity: 1, transform: "translate3d(0, 0px, 0)", delay },
        // delay: delay,
        config: { ...config.molasses, duration: 750 },
        // onRest: () => setShow(false),
    });

    React.useEffect(() => {
        // console.log("Inview", inView)
        setShow(inView);
    }, [inView]);

    return (
        <div ref={ref} className={className}>
            <IconContainer component="div">
                {show && icon}
            </IconContainer>
            {transitions((styles, item) => item && (
                <animated.div style={styles}>
                    <Typography variant="h5">
                        {text}
                    </Typography>
                </animated.div>
            ))}
        </div>
    );
})`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const RequirementsSection = styled(({ className, requirements }: RequirementsSectionProps) => (
    <Box component="div" className={className}>
        {requirements.map((item, idx) => (
            <RequirementView key={`requirement-view-${idx}`} {...item} />
        ))}
    </Box>
))(({ theme }) => `
    background-color: #231E52;
    display: flex;
    filter: drop-shadow(2px 4px 6px black);
    flex-direction: row;
    justify-content: space-around;
    // max-width: calc(1920px - 2 * ${theme.spacing(12)});
    padding: ${theme.spacing(20, 12)};
    width: 100%;

    & h5 {
        align: center;
        color: rgb(255, 255, 255);
        font-family: Pangram;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 0.4px;
        line-height: 40px;
    }

    & h2 {
        font-family: "Balsamiq Sans",Roboto,Arial;
    }
`);

export default RequirementsSection;
