import * as React from "react";
import { useInView } from "react-intersection-observer";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { createStyles, WithStyles, withStyles } from "@mui/styles";
import { animated, config, useTransition } from "@react-spring/web";


export interface Requirement {
    icon: React.ReactElement;
    text: string;
    delay: number;
};

type RequirementViewProps = WithStyles<typeof styles> & Requirement;

const styles = (theme: Theme) => createStyles({
    container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    icon: { 
        marginBottom: theme.spacing(6),
        "& svg": {
            height: 160, 
            width: 160,
        },
    },
})

const RequirementView = withStyles(styles)(({ classes, icon, text, delay }: RequirementViewProps) => {
    const [show, setShow] = React.useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '80px 0px',
    });
    const transitions = useTransition(show, {
        from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
        enter: { opacity: 1, transform: "translate3d(0, 0px, 0)", delay: delay },
        // delay: delay,
        config: { ...config.molasses, duration: 750 },
        // onRest: () => setShow(false),
    });

    React.useEffect(() => {
        // console.log("Inview", inView)
        setShow(inView);
    }, [inView])

    return (
        <div ref={ref} className={classes.container}>
            <Box component="div" className={classes.icon}>
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
    )
});

export default RequirementView