import * as React from "react"
import { animated, useSpring } from "react-spring";

import { SvgIcon } from "@mui/material";

export const BackgroundPart = ({ delay }: {delay: number}) => {
    const props = useSpring({
        from: { scale: 0 },
        to: { scale: 1 },
        config: { duration: 500 },
        delay: delay,
    })
    return (
        <animated.circle style={{ transformOrigin: "center", transformBox: "fill-box", ...props }} cx="80" cy="80" r="80" fill="#938CD1"/>
    )
};

const ClockPart = ({ delay }: {delay: number}) => {
    const props = useSpring({
        from: { scale: 0, rotate: -90 },
        to: { scale: 1, rotate: 0 },
        config: { duration: 750 },
        delay: delay,
    });

    return (
        <React.Fragment>
            <defs>
                <path id="clock-tick-v" d="M2.00506 6.02969C1.17167 6.02969 0.496094 5.3541 0.496094 4.52071V2.30586C0.496094 1.47246 1.17167 0.796875 2.00506 0.796875C2.83844 0.796875 3.51421 1.47246 3.51421 2.30586V4.52071C3.51421 5.3541 2.83844 6.02969 2.00506 6.02969Z" fill="#2B4D66"/>
                <path id="clock-tick-h" d="M2.00506 6.02969C1.17167 6.02969 0.496094 5.3541 0.496094 4.52071V2.30586C0.496094 1.47246 1.17167 0.796875 2.00506 0.796875C2.83844 0.796875 3.51421 1.47246 3.51421 2.30586V4.52071C3.51421 5.3541 2.83844 6.02969 2.00506 6.02969Z" fill="#2B4D66" transform="rotate(90)"/>
                <path id="clock-tick-r" d="M2.00506 6.02969C1.17167 6.02969 0.496094 5.3541 0.496094 4.52071V2.30586C0.496094 1.47246 1.17167 0.796875 2.00506 0.796875C2.83844 0.796875 3.51421 1.47246 3.51421 2.30586V4.52071C3.51421 5.3541 2.83844 6.02969 2.00506 6.02969Z" fill="#2B4D66" transform="rotate(45)"/>
                <path id="clock-tick-l" d="M2.00506 6.02969C1.17167 6.02969 0.496094 5.3541 0.496094 4.52071V2.30586C0.496094 1.47246 1.17167 0.796875 2.00506 0.796875C2.83844 0.796875 3.51421 1.47246 3.51421 2.30586V4.52071C3.51421 5.3541 2.83844 6.02969 2.00506 6.02969Z" fill="#2B4D66" transform="rotate(-45)"/>
                <path id="clock-border" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="#5B4DD1"/>
                <path id="clock-face" d="M38.9975 77.9622C60.5158 77.9622 77.9598 60.5182 77.9598 38.9999C77.9598 17.4816 60.5158 0.0375977 38.9975 0.0375977C17.4792 0.0375977 0.0351562 17.4816 0.0351562 38.9999C0.0351562 60.5182 17.4792 77.9622 38.9975 77.9622Z" fill="#F4AA73"/>
                <path id="clock-border-shadow" d="M3.00039 0C2.10781 0 1.2209 0.0244141 0.339844 0.0705078C26.7172 1.45371 47.6795 23.2783 47.6795 50C47.6795 76.7217 26.7172 98.5463 0.339844 99.9295C1.2209 99.9756 2.10781 100 3.00039 100C30.6146 100 53.0004 77.6143 53.0004 50C53.0004 22.3857 30.6146 0 3.00039 0Z" fill="#3A3185"/>
                <path id="clock-face-shadow" d="M3.99707 0.0375977C2.91797 0.0375977 1.8498 0.0834959 0.792969 0.169433C20.8123 1.79912 36.5514 18.5606 36.5514 38.9999C36.5514 59.4392 20.8123 76.2005 0.792969 77.8304C1.8498 77.9165 2.91797 77.9624 3.99707 77.9624C25.5154 77.9624 42.9594 60.5183 42.9594 39.0001C42.9594 17.4819 25.5154 0.0375977 3.99707 0.0375977Z" fill="#E29A6C"/>
                {/* Clock fingers */}
                <path id="minute-hour-finger" d="M14.9973 24.509H2.18086C1.34746 24.509 0.671875 23.8332 0.671875 22.9998C0.671875 22.1664 1.34746 21.4908 2.18086 21.4908H13.4881V2.29219C13.4881 1.45879 14.1637 0.783203 14.9971 0.783203C15.8305 0.783203 16.5061 1.45879 16.5061 2.29219V22.9998C16.5063 23.8332 15.8307 24.509 14.9973 24.509Z" fill="#2B4D66"/>
                <path id="second-finger" d="M17.4831 11.4704C17.2507 11.4704 17.0152 11.4165 16.7943 11.3031L1.31146 3.34137C0.570249 2.96032 0.278453 2.05056 0.659508 1.30935C1.04056 0.568138 1.95033 0.276147 2.69173 0.657396L18.1745 8.61889C18.9157 9.00014 19.2077 9.90991 18.8265 10.6509C18.5587 11.1714 18.0306 11.4704 17.4831 11.4704Z" fill="#F74F4F"/>
                {/* Center */}
                <path id="clock-center" d="M5.00037 9.02784C7.22482 9.02784 9.0281 7.22457 9.0281 5.00012C9.0281 2.77568 7.22482 0.972412 5.00037 0.972412C2.77593 0.972412 0.972656 2.77568 0.972656 5.00012C0.972656 7.22457 2.77593 9.02784 5.00037 9.02784Z" fill="#365E7D"/>
            </defs>

            <animated.g style={{ transformOrigin: "center", transformBox: "fill-box",...props}}>
                <use xlinkHref="#clock-border" x="30" y="30"/>
                <use xlinkHref="#clock-border-shadow" x="77.34" y="30"/>
                <use xlinkHref="#clock-face" x="41.04" y="41.04"/>
                <use xlinkHref="#clock-face-shadow" x="76.79" y="41.04"/>
                <use xlinkHref="#minute-hour-finger" x="65.67" y="57.78"/>
                <use xlinkHref="#second-finger" x="78.49" y="78.49"/>
                <use xlinkHref="#clock-center" x="75.97" y="75.97"/>
                <use href="#clock-tick-v" x="78.0" y="47.8"/>
                <use href="#clock-tick-v" x="78.0" y="106.97"/>
                <use href="#clock-tick-h" x="53.03" y="78.0"/>
                <use href="#clock-tick-h" x="112.2" y="78.0"/>
                <use href="#clock-tick-r" x="103.13" y="54.53"/>
                <use href="#clock-tick-l" x="54.41" y="57.53"/>
                <use href="#clock-tick-r" x="58.99" y="96.15"/>
                <use href="#clock-tick-l" x="98.25" y="98.94"/>
            </animated.g>
        </React.Fragment>
    );
}


const ClockIcon = ({ delay }: {delay: number}) => (
    <SvgIcon viewBox="0 0 160 160">
        <g>
            <BackgroundPart delay={delay} />
            <ClockPart delay={delay} />
        </g>
    </SvgIcon>
);

export default ClockIcon;