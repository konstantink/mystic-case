import * as React from "react";

import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";

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
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: "#FEFEFE",
        padding: theme.spacing(20, 12),
    },
    title: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: theme.spacing(9),
        fontWeight: 700,
        letterSpacing: "0.4px",
        lineHeight: "74px",
    },
    questionContainer: {
        paddingTop: theme.spacing(15.5),
    },
    question: {
        color: "#231E52",
        fontFamily: "Pangram",
        fontSize: theme.spacing(5),
        fontWeight: 700,
        letterSpacing: "0.4px",
        lineHeight: "56px",
    },
    answer: {
        color: "#666666",
        fontFamily: "Pangram",
        fontSize: theme.spacing(3),
        fontWeight: 400,
        letterSpacing: "0.3px",
        lineHeight: "36px",
    },
    link: {
        color: "#5456B1",
        font: "inherit",
    }
}));

const Accordion = withStyles({
    root: {
        boxShadow: "none",
        "&:before": {
            height: 0,
        },
    },
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
    },
})(MuiAccordionSummary);

const iconStyles = createStyles({
    root: {
        "& > .e": {
            display: "block",
        },
        "& > .c": {
            display: "none",
        },
        ".Mui-expanded & > .c": {
            display: "block",
        },
        ".Mui-expanded & > .e": {
            display: "none",
        },
    },
});

const Icon = withStyles(iconStyles)(({ classes }: WithStyles<typeof iconStyles>) => (
    <div className={classes.root}>
        <Expand  className="e" />
        <Collapse className="c" />
    </div>
));

const FAQSection = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const onChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    }

    const formatMentionText = (text: string, values: Array<string>, regex: RegExp): string | Array<string | JSX.Element> => { 
        if (!values.length)
            return text;

        return text.split(regex).map((item, idx) => {
            if (values.includes(item))
                return (
                    <Link href={name2Url[item]} color="inherit" underline="none" variant="caption" className={classes.link} target="_blank" rel="noreferrer">
                        {item}
                    </Link>
                )
            return item;
        })
    };

    return (
        <Box component="div" className={classes.root}>
            <Typography variant="h1" className={classes.title} align="center">
                FAQ
            </Typography>
            <Container className={classes.questionContainer}>
                {questions.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <Accordion square expanded={expanded === item.id} onChange={onChange(item.id)}>
                            <AccordionSummary aria-controls={`${item.id}-content`} id={`${item.id}-header`} expandIcon={<Icon />}>
                                <Typography variant="body1" className={classes.question}>
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" className={classes.answer}>
                                    {formatMentionText(item.answer, Object.keys(name2Url), new RegExp(/((?:\w+)?@[\w\-\.]+)/))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Box component="div" height={0} width="100%" border="2px solid #938CD1" borderRadius={2} marginTop="26px" marginBottom="26px"></Box>
                    </React.Fragment>
                ))}
            </Container>
        </Box>
    )
};

export default FAQSection;