import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export type Feature = {
    name: string;
    text: string;
    imageUrl: string;
}

interface FeaturesSectionProps {
    className?: string;
    content: Array<Feature>;
}

// const featureStyles = (theme: Theme) => createStyles({
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         width: 549,
//     },
//     image: {
//         // background: "url('/assets/images/family.jpeg')",
//         borderRadius: theme.spacing(3),
//         height: 594,
//         marginBottom: theme.spacing(3),
//         overflow: "hidden",
//         width: "100%",
//         "& img": {
//             height: "100%",
//             objectFit: "cover",
//             width: "100%",
//         },
//     },
//     header: {
//         color: "#B3D138",
//         fontFamily: "Pangram",
//         fontSize: `${theme.spacing(4)}px`,
//         fontWeight: 700,
//         letterSpacing: "0.4%",
//         lineHeight: "48px",
//         marginBottom: theme.spacing(1),
//     },
//     text: {
//         color: "#FEFEFE",
//         fontFamily: "Pangram",
//         fontSize: `${theme.spacing(3)}px`,
//         fontWeight: 400,
//         letterSpacing: "0.3px",
//         lineHeight: "36px",
//     },
// });

type FeatureProps = {
    className?: string;
} & Feature;

const InteractiveTextGrid = styled(Grid)(({ theme }) => `
    padding-bottom: ${theme.spacing(15)};
`);

const InteractiveText = styled(Typography)(({ theme }) => `
    color: #FEFEFE;
    font-family: Pangram;
    font-size: 56px;
    font-weight: 600;
    letter-spacing: 0.4px;
    line-height: ${theme.spacing(8)};
    // margin-left: auto;
    max-width: ${theme.spacing(120.5)};
    text-transform: capitalize;
`);

const ImageBox = styled(Box)(({ theme }) => `
    // background: url('/assets/images/family.jpeg');
    border-radius: ${theme.spacing(3)};
    height: 594px;
    margin-bottom: ${theme.spacing(3)};
    overflow: hidden;
    width: 100%;
    img {
        height: 100%;
        object-fit: cover;
        width: 100%;
    }
`);

const HeaderText = styled(Typography)(({ theme }) => `
    color: #B3D138;
    font-family: Pangram;
    font-size: ${theme.spacing(4)};
    font-weight: 700;
    letter-spacing: 0.4%;
    line-height: 48px;
    margin-bottom: ${theme.spacing(1)},
`);

const FeatureText = styled(Typography)(({ theme }) => `
    color: #FEFEFE;
    font-family: Pangram;
    font-size: ${theme.spacing(3)};
    font-weight: 400;
    letter-spacing: 0.3px;
    line-height: 36px;
`);

const FeatureView = styled(({ className, name, text, imageUrl }: FeatureProps) => (
    <Box component="div" className={className}>
        <ImageBox component="div">
            <img src={imageUrl} alt={name} />
        </ImageBox>
        <HeaderText variant="h3">
            {name}
        </HeaderText>
        <FeatureText variant="h4">
            {text}
        </FeatureText>
    </Box>
))`
    display: flex;
    flex-direction: column;
    width: 549px;
`;

const FeaturesSection = styled(({ className, content }: FeaturesSectionProps) => {
    return (
        <Box component="div" className={className}>
            {/* <Box component="div" className={classes.interactiveTextContainer}> */}
            <InteractiveTextGrid container className={"className"} spacing={5}>
                <Grid xs={4}></Grid>
                <Grid xs={8}>
                    <InteractiveText variant="h2">
                        <span style={{ color: "#FFD644" }}>Mystic case</span> is an interactive game you can play on the table
                    </InteractiveText>
                </Grid>
            </InteractiveTextGrid>
            {/* </Box> */}
            {/* <Box component="div" className={classes.container}> */}
            <Grid container spacing={5}>
                {content.map((item, idx) => (
                    <Grid key={`feature-key-${idx}`} xs={4}>
                        <FeatureView key={`feature-view-${idx}`} {...item} />
                    </Grid>
                ))}
            </Grid>
            {/* </Box> */}
        </Box>
    );
})(({ theme }) => `
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing(20, 12)};
`);

export default FeaturesSection;
