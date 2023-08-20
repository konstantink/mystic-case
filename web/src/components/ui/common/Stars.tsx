import React from "react";
import { animated, config, useSprings } from "react-spring";

export interface StarsProps extends Object {
    className?: string;
}

const positions = [{
    x: 15,
    y: 87,
    directionX: [14.5, 15],
    directionY: [86.5, 87],
    duration: 1500,
}, {
    x: 45,
    y: -15,
    directionX: [44.5, 45],
    directionY: [-14.75, -15],
    duration: 1200,
}, {
    x: 29,
    y: 17,
    directionX: [29.5, 29],
    directionY: [17.25, 17],
    duration: 1350,
}, {
    x: 45,
    y: 80,
    directionX: [44.5, 45],
    directionY: [80.75, 80],
    duration: 1750,
}, {
    x: 70,
    y: 0,
    directionX: [70.5, 70],
    directionY: [0.75, 0],
    duration: 2000,
}];

export const Stars = ({ className }: StarsProps) => {
    const [springs] = useSprings(5,
        (idx) => ({
            from: { x: `${positions[idx].x}%`, y: `${positions[idx].y}` },
            to: [{ x: `${positions[idx].directionX[0]}%`, y: `${positions[idx].directionY[0]}%` }, { x: `${positions[idx].directionX[1]}%`, y: `${positions[idx].directionY[1]}%` }],
            loop: true,
            config: {
                ...config.gentle,
                duration: positions[idx].duration,
            },
        })
    );

    return (
        <animated.svg className={className} width="100%" height="100%" viewBox="0 0 100% 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[1, 1.5, 3, 4, 5].map((scaleParam, idx) => (
                <animated.path key={`star-${idx}`} style={springs[idx]} d={`M${scaleParam * 7.65168} ${scaleParam * 0.265972}C${scaleParam * 7.77081} -${scaleParam * 0.0886573} ${scaleParam * 8.2724} -${scaleParam * 0.0886572} ${scaleParam * 8.39154} ${scaleParam * 0.265972}L${scaleParam * 10.1805} ${scaleParam * 5.59127}L${scaleParam * 14.6294} ${scaleParam * 7.41872}C${scaleParam * 14.9413} ${scaleParam * 7.54686} ${scaleParam * 14.9548} ${scaleParam * 7.98365} ${scaleParam * 14.6514} ${scaleParam * 8.13082}L${scaleParam * 10.1805} ${scaleParam * 10.2993}L${scaleParam * 8.39154} ${scaleParam * 15.6246}C${scaleParam * 8.2724} ${scaleParam * 15.9792} ${scaleParam * 7.77081} ${scaleParam * 15.9792} ${scaleParam * 7.65168} ${scaleParam * 15.6246}L${scaleParam * 5.86272} ${scaleParam * 10.2993}L${scaleParam * 1.39182} ${scaleParam * 8.13082}C${scaleParam * 1.08839} ${scaleParam * 7.98365} ${scaleParam * 1.1019} ${scaleParam * 7.54686} ${scaleParam * 1.41385} ${scaleParam * 7.41872}L${scaleParam * 5.86272} ${scaleParam * 5.59127}L${scaleParam * 7.65168} ${scaleParam * 0.265972}Z`} fill="#FFD644"/>
            ))}
        </animated.svg>
    );
};
