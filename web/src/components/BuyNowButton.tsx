import * as React from "react";
import { animated, useSpring } from "react-spring";

import { styled } from "@mui/material/styles";

type Coords = {
    x: number,
    y:number
};

const ButtonBackground = styled("span")(({ theme }) => `
    border-radius: ${theme.spacing(10)};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-ndex: 10;
`);

const BuyNowButton = styled(({ className }: { className?: string }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const handleClick = (e: React.MouseEvent) => {
        if (ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            set({
                reset: true,
                config: {
                    damping: 0.8,
                    frequency: 9 / 10,
                },
                onRest: () => { console.log("onRest"); },
                from: { scale: 0, opacity: 1 },
                to: { scale: 30, opacity: 0 },
            });
            // console.log(e.clientX)
        }
    };

    const [isRippling, setRippling] = React.useState<boolean>(false);
    const [coords, setCoords] = React.useState<Coords>({ x: -1, y: -1 });

    const [props, set] = useSpring(() => ({
        from: { opacity: 0, scale: 0 },
        to: { opacity: 0.5, scale: 35 },
        config: { duration: 900 },
    }));

    React.useEffect(() => {
        if (!isRippling) { setCoords({ x: -1, y: -1 }); }
    }, [isRippling]);

    React.useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setRippling(true);
            setTimeout(() => setRippling(false), 300);
        } else {
            setRippling(false);
        }
    }, [coords]);

    return (
        <div ref={ref} className={className} onClick={handleClick}>
            {isRippling && (<animated.span className="ripple" style={{ left: coords.x, top: coords.y, ...props }}/>)}
            <span style={{ zIndex: 105 }}>Buy now</span>
            <ButtonBackground />
        </div>
    );
})(({ theme }) => `
    background-color: #B3D138;
    border-radius: ${theme.spacing(10)};
    // height: theme.spacing(10);
    overflow: hidden;
    padding: ${theme.spacing(3, 4)};
    position: relative;
    z-index: 100;

    // width: theme.spacing(33);
    // "& a": {
        color: #3A3185;
        font-family: Pangram;
        font-size: ${theme.spacing(3)};
        font-weight: 900;
        line-height: ${theme.spacing(3)}px;
        letter-spacing: 0.3px;
        text-tecoration: none;
        text-transform: uppercase;
        white-space: nowrap;
    // }
    &:hover {
        background-color: #9FBD24;
    }
    & .ripple {
        width: 20;
        height: 20;
        position: "absolute";
        background: "#269FBD24"; //"rgba(159, 190, 36, 0.26)"; //"#63a4ff";
        display: "block";
        border-radius: 9999;
        opacity: 0;
        //zIndex: 102;
    }
`);

export default BuyNowButton;
