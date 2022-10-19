import * as React from "react";
import { animated, config, useChain, useSpringRef, useSprings } from "react-spring";

import { SvgIconProps } from "@material-ui/core";


const Loading = (rest: SvgIconProps) => {
    const refs = [useSpringRef(), useSpringRef(), useSpringRef()]
    const stars = [{x: 50, y: 32}, {x: 28, y: 88}, {x: 96, y: 64}];
    const [ springs ] = useSprings(3, (index) => ({
        from: { scale: 0, rotate: 0 },
        loop: {
            reset: true,
            delay: 600,
        },
        to: [{ scale: 4, rotate: 90 }, { scale: 0, rotate: 180   }],
        delay: 600*index,
        config: {
            ...config.gentle,
            duration: 600,
        },
        ref: refs[index],
    }));

    useChain(refs);
    return (
        <React.Fragment>
            <animated.svg xmlns="http://www.w3.org/2000/svg" width="200" height="128" viewBox="0 0 200 128" fill="none" {...rest}>
                <defs>
                    <path id="start" d="M6.65168 0.265972C6.77081 -0.0886573 7.2724 -0.0886572 7.39154 0.265972L9.1805 5.59127L13.6294 7.41872C13.9413 7.54686 13.9548 7.98365 13.6514 8.13082L9.1805 10.2993L7.39154 15.6246C7.2724 15.9792 6.77081 15.9792 6.65168 15.6246L4.86272 10.2993L0.391824 8.13082C0.0883905 7.98365 0.101899 7.54686 0.413847 7.41872L4.86272 5.59127L6.65168 0.265972Z" fill="#FFD644"/>
                </defs>
                {springs.map((style, i) => (
                    <animated.g key={i} style={{ transformOrigin: "center", transformBox: "fill-box", ...style }}>
                        <use href="#start" x={stars[i].x} y={stars[i].y}/>
                    </animated.g>
                ))}
            </animated.svg>
        </React.Fragment>
    );
}

export default Loading;