import * as React from "react";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { Collapse, Expand } from "../icons/Expand";

interface Question {
    question: string,
    answer: string,
    id: string,
}

const questions: Array<Question> = [
    {
        question: "Can I play the game more than once?",
        answer: "As the box has an interactive plot some of the objects will be spoiled during the game. So it is for a single use only.",
        id: "number-of-plays",
    },
    {
        // question: "Do the boxes come already set up and ready to go or is it a case of someone needs to set everything up put things in envelopes and get ready the game?",
        question: "Are the boxes ready to play?",
        answer: "All our boxes are ready to play and already contain everything you need. So the only thing you need is to choose the topic you’d like to start with and enjoy time resolving the case :)",
        id: "ready-boxes",
    },
    {
        question: "What if I don’t understand how to solve the puzzle?",
        answer: "There are detailed hints on every step, which you can use if you are stuck. But if you still need more tips or explanations of how the task supposed to be solve just message us via FB @mysticcase.fb, Instagram @mystic_case or email contact@mystic-case.co.uk  and we will provide some ideas.",
        id: "puzzle-issue",
    },
    {
        question: "Do I need Internet to play the game?",
        answer: "No, everything you need is already included into the boxes. You can focus on having fan with your team :)",
        id: "internet",
    },
    {
        question: "I still have a question",
        answer: "We will be happy to answer any, just give us a message in FB @mysticcase.fb, Instagram @mystic_case or email contact@mystic-case.co.uk",
        id: "more-questions",
    }
];

const name2Url: {[k in string]: string} = {
    "@mysticcase.fb": "https://www.facebook.com/mysticcase.fb/",
    "@mystic_case": "https://www.instagram.com/mystic_case/",
    "contact@mystic-case.co.uk": "mailto:contact@mystic-case.co.uk",
};

const Accordion = styled(MuiAccordion)({
    boxShadow: "none",
    "&:before": {
        height: 0,
    },
});

const AccordionSummary = styled(MuiAccordionSummary)({});

const Icon = styled(({ className }: { className?: string }) => (
    <Box component="div" className={className}>
        <Expand className="e" />
        <Collapse className="c" />
    </Box>
))`
    & .e {
        display: block;
    }

    & .c {
        display: none;
    }

    .Mui-expanded & > .c {
        display: block;
    }

    .Mui-expanded & > .e {
        display: none;
    }
`;

const FAQContainer = styled(Box)(({ theme }) => `
    background: #FEFEFE;
    display: flex;
    justify-content: center;
    padding: ${theme.spacing(20, 12)};
    width: 100%;

    .faq-root {
        max-width: calc(1920px - 2 * ${theme.spacing(12)});
    }

    .faq-title {
        color: #231E52;
        font-family: Pangram;
        font-size: ${theme.spacing(9)};
        font-weight: 700;
        letter-spacing: 0.4px;
        line-height: 74px;
    }

    .faq-question-container {
        padding-top: ${theme.spacing(15.5)};
    }

    .faq-question {
        color: #231E52;
        font-family: Pangram;
        font-size: ${theme.spacing(5)};
        font-weight: 700;
        letter-spacing: 0.4px;
        line-height: 56px;
    }

    .faq-answer {
        color: #666666;
        font-family: Pangram;
        font-size: ${theme.spacing(3)};
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 36px;
    }

    .faq-link {
        color: #5456B1;
        font: inherit;
    }
`);

const FAQSection = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const onChange = (panel: string) => (event: React.ChangeEvent<object>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const formatMentionText = (text: string, values: Array<string>, regex: RegExp): string | Array<string | JSX.Element> => {
        if (!values.length) {
            return text;
        }

        return text.split(regex).map((item, idx) => {
            if (values.includes(item)) {
                return (
                    <Link key={`regex-${idx}`} href={name2Url[item]} color="inherit" underline="none" variant="caption" className="faq-link" target="_blank" rel="noreferrer">
                        {item}
                    </Link>
                );
            }
            return item;
        });
    };

    return (
        <FAQContainer component="div">
            <Box component="div" className="faq-root">
                <Typography variant="h2" className="faq-title" align="center">
                    FAQ
                </Typography>
                <Container className="faq-question-container">
                    {questions.map((item, idx) => (
                        <React.Fragment key={`key-faq-section-${idx}`}>
                            <Accordion square expanded={expanded === item.id} onChange={onChange(item.id)}>
                                <AccordionSummary aria-controls={`${item.id}-content`} id={`${item.id}-header`} expandIcon={<Icon />}>
                                    <Typography variant="body1" className="faq-question">
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" className="faq-answer">
                                        {formatMentionText(item.answer, Object.keys(name2Url), /((?:\w+)?@[\w\-.]+)/)}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Box component="div" height={0} width="100%" border="2px solid #938CD1" borderRadius={2} marginTop="26px" marginBottom="26px"></Box>
                        </React.Fragment>
                    ))}
                </Container>
            </Box>
        </FAQContainer>
    );
};

export default FAQSection;
