import * as React from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface DifficultyLevelProps {
    difficulty: number;
}

const FilledStar = () => (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.2651 9.90641C27.0905 9.37113 26.6116 8.99095 26.0449 8.94032L18.3482 8.24752L15.3047 1.18579C15.0803 0.668257 14.5693 0.333252 14.0014 0.333252C13.4336 0.333252 12.9225 0.668257 12.6981 1.187L9.65459 8.24752L1.95665 8.94032C1.39105 8.99216 0.913333 9.37113 0.737751 9.90641C0.562169 10.4417 0.724322 11.0288 1.15219 11.3989L6.96999 16.4569L5.25446 23.9482C5.12893 24.499 5.34459 25.0684 5.80562 25.3987C6.05343 25.5762 6.34335 25.6666 6.63572 25.6666C6.8878 25.6666 7.13784 25.5992 7.36226 25.4661L14.0014 21.5326L20.6381 25.4661C21.1238 25.7557 21.736 25.7293 22.196 25.3987C22.6572 25.0674 22.8727 24.4978 22.7471 23.9482L21.0316 16.4569L26.8494 11.3999C27.2773 11.0288 27.4407 10.4427 27.2651 9.90641Z" fill="#B3D138"/>
    </svg>
);

const OutlinedStar = () => (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.3136 10.2981L26.3139 10.2992C26.3659 10.4594 26.318 10.6333 26.1909 10.7445L26.1901 10.7452L20.3723 15.8464L19.9246 16.239L20.0564 16.8197L21.7718 24.3761C21.8092 24.5413 21.7455 24.71 21.6091 24.8088L21.6091 24.8089C21.4728 24.9076 21.2946 24.9144 21.1536 24.8296L21.1513 24.8282L14.5146 20.8602L14.0015 20.5534L13.4884 20.8601L6.84923 24.8281L6.84879 24.8284C6.77919 24.87 6.70654 24.8887 6.63572 24.8887C6.55263 24.8887 6.4679 24.8633 6.39145 24.8081C6.25689 24.7108 6.1922 24.5431 6.22979 24.376C6.22982 24.3759 6.22985 24.3758 6.22987 24.3756L7.94518 16.8197L8.07699 16.2391L7.62935 15.8465L1.81155 10.7442L1.80965 10.7426C1.68521 10.634 1.63644 10.4606 1.68874 10.2997C1.7409 10.1393 1.88103 10.0274 2.04827 10.0117C2.04842 10.0117 2.04856 10.0117 2.0487 10.0117L9.745 9.31299L10.3396 9.25901L10.5742 8.71002L13.6171 1.58886C13.6172 1.58872 13.6172 1.58859 13.6173 1.58845C13.6849 1.43125 13.8355 1.3335 14.0014 1.3335C14.1676 1.3335 14.3182 1.43153 14.3857 1.58767C14.3858 1.58792 14.3859 1.58817 14.386 1.58841L17.4286 8.70997L17.6632 9.259L18.2578 9.31298L25.9545 10.0119L25.9552 10.0119C26.122 10.027 26.2621 10.1391 26.3136 10.2981Z" stroke="#B3D138" strokeWidth="2"/>
    </svg>
);

const DifficultyLevelContainer = styled(Box)`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    & p {
        color: #231E52;
        font-family: Pangram;
        font-size: 20px;
        font-weight: 700;
        line-height: 38px;
        line-spacing: 0.8px;
        text-transform: uppercase;
    }
`;

const StarsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
`;

const DifficultyLevel = ({ difficulty }: DifficultyLevelProps) => (
    <DifficultyLevelContainer component="div">
        <Typography variant="body1">
            Difficulty level
        </Typography>
        <StarsContainer component="div">
            {[1, 2, 3, 4, 5].map(item => {
                return difficulty >= item ? (<FilledStar key={`star-${item}`} />) : (<OutlinedStar key={`star-${item}`} />);
            })}
        </StarsContainer>
    </DifficultyLevelContainer>
);

export default DifficultyLevel;
