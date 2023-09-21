import * as React from "react";

import { SvgIconProps } from "@mui/material/SvgIcon";

export const ArrowLeft = (rest: SvgIconProps) => (
    <svg {...rest}>
        <path d="M38.1818 9.18194L6.20764 9.18194L12.1948 3.19479C12.9048 2.48485 12.9048 1.33357 12.1948 0.623512C11.8398 0.268604 11.3744 0.0910276 10.9091 0.0910276C10.4438 0.0910275 9.97842 0.268602 9.62351 0.623632L0.532601 9.71454C-0.177459 10.4245 -0.177459 11.5758 0.532601 12.2858L9.62351 21.3767C10.3335 22.0867 11.4847 22.0867 12.1948 21.3767C12.9048 20.6668 12.9048 19.5155 12.1948 18.8054L6.20763 12.8183L38.1818 12.8183C39.1859 12.8183 40 12.0042 40 11.0001C40 9.996 39.1859 9.18194 38.1818 9.18194Z" fill="white"/>
    </svg>
);

export const ArrowRight = (rest: SvgIconProps) => (
    <svg {...rest}>
        <path d="M1.81818 9.18194L33.7924 9.18194L27.8052 3.19479C27.0952 2.48485 27.0952 1.33357 27.8052 0.623512C28.1602 0.268604 28.6256 0.0910276 29.0909 0.0910276C29.5562 0.0910275 30.0216 0.268602 30.3765 0.623632L39.4674 9.71454C40.1775 10.4245 40.1775 11.5758 39.4674 12.2858L30.3765 21.3767C29.6665 22.0867 28.5153 22.0867 27.8052 21.3767C27.0952 20.6668 27.0952 19.5155 27.8052 18.8054L33.7924 12.8183L1.81818 12.8183C0.81406 12.8183 -8.65917e-07 12.0042 -9.537e-07 11.0001C-1.04148e-06 9.996 0.81406 9.18194 1.81818 9.18194Z" fill="white"/>
        {/* <path d="M2.72728 13.3334L50.6886 13.3333L41.7079 4.55218C40.6428 3.51094 40.6428 1.8224 41.7079 0.780976C42.2404 0.260441 42.9384 -3.7538e-06 43.6364 -3.81482e-06C44.3344 -3.87584e-06 45.0324 0.260441 45.5648 0.781153L59.2012 14.1145C60.2663 15.1557 60.2663 16.8443 59.2012 17.8857L45.5648 31.2191C44.4999 32.2603 42.773 32.2603 41.7079 31.2191C40.6428 30.1778 40.6428 28.4893 41.7079 27.4479L50.6886 18.6667L2.72728 18.6667C1.22109 18.6667 -1.27001e-06 17.4727 -1.39876e-06 16C-1.52751e-06 14.5273 1.22109 13.3334 2.72728 13.3334Z" fill="white"/> */}
    </svg>
);
