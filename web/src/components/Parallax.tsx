import * as React from "react";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";


const GhostParallax = () => (
    <React.Fragment>
        <ParallaxLayer offset={0} speed={30} style={{ pointerEvents: "none" }}>
            <img src="/assets/images/box.png" style={{ width: 157 }} />
        </ParallaxLayer>
    </React.Fragment>
)

export default GhostParallax;