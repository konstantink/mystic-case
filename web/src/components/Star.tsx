import * as React from "react";

import Box from "@material-ui/core/Box";

interface StarProps {
    height: number;
    width: number;
    left: number | string;
    top: number | string;
}

const Star = ({ width, height, left, top }: StarProps) => {
    const baseSize= {w: 14, h: 16};
    const scaleParam = width / baseSize.w;

    return (
        <Box component="div" style={{ position: "absolute", height: "100%", width: "100%" }}>
            <Box component="div" style={{ position: "absolute", width: width, height: height, top: top, left: left }}>
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path d="M26.6028 1.06389C27.0794 -0.354629 29.0857 -0.354629 29.5622 1.06389L36.7181 22.3651L54.5136 29.6749C55.7614 30.1874 55.8154 31.9346 54.6017 32.5233L36.7181 41.1971L29.5622 62.4983C29.0857 63.9169 27.0794 63.9168 26.6028 62.4983L19.447 41.1971L1.56339 32.5233C0.349656 31.9346 0.403689 30.1874 1.65148 29.6749L19.447 22.3651L26.6028 1.06389Z" fill="#FFD644"/> */}
                    <path d={`M${scaleParam*6.65168} ${scaleParam*0.265972}C${scaleParam*6.77081} ${scaleParam*-0.0886573} ${scaleParam*7.2724} ${scaleParam*-0.0886572} ${scaleParam*7.39154} ${scaleParam*0.265972}L${scaleParam*9.1805} ${scaleParam*5.59127}L${scaleParam*13.6294} ${scaleParam*7.41872}C${scaleParam*13.9413} ${scaleParam*7.54686} ${scaleParam*13.9548} ${scaleParam*7.98365} ${scaleParam*13.6514} ${scaleParam*8.13082}L${scaleParam*9.1805} ${scaleParam*10.2993}L${scaleParam*7.39154} ${scaleParam*15.6246}C${scaleParam*7.2724} ${scaleParam*15.9792} ${scaleParam*6.77081} ${scaleParam*15.9792} ${scaleParam*6.65168} ${scaleParam*15.6246}L${scaleParam*4.86272} ${scaleParam*10.2993}L${scaleParam*0.391824} ${scaleParam*8.13082}C${scaleParam*0.0883905} ${scaleParam*7.98365} ${scaleParam*0.101899} ${scaleParam*7.54686} ${scaleParam*0.413847} ${scaleParam*7.41872}L${scaleParam*4.86272} ${scaleParam*5.59127}L${scaleParam*6.65168} ${scaleParam*0.265972}Z`} fill="#FFD644"/>
                </svg>
            </Box>
        </Box>
    );
};

export default Star;