import * as React from "react";
import { useInView } from "react-intersection-observer";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { animated, config, useTransition } from "@react-spring/web";

import styles from "@styles/ui/home.module.scss";

export interface Requirement {
    icon: React.ReactElement;
    text: string;
    delay: number;
}

interface RequirementsProps {
    className?: string;
    requirements: Array<Requirement>;
}

interface RequirementViewProps extends Requirement {
    className?: string;
}

const RequirementView = ({ icon, text, delay }: RequirementViewProps) => {
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
        <div ref={ref} className={styles["mc-requirements-requirement-view"]}>
            <Box className={styles["mc-requirements-icon-container"]} component="div">
                {show && icon}
            </Box>
            {transitions((styles, item) => item && (
                <animated.div style={styles}>
                    <Typography variant="h5">
                        {text}
                    </Typography>
                </animated.div>
            ))}
        </div>
    );
};

export const Requirements = ({ requirements }: RequirementsProps) => (
    <Box component="div" className={styles["mc-requirements-container"]}>
        {requirements.map((item, idx) => (
            <RequirementView key={`requirement-view-${idx}`} {...item} />
        ))}
    </Box>
);

export default Requirements;
