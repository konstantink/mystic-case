import React from "react";

import {
    Description,
    FAQ,
    Feature,
    Features,
    FeedbackSection,
    Main,
    PlanetMysticCase,
    Products,
    Requirement,
    Requirements,
    Stripe,
    VideoIntroduction
} from "@mysticcase/ui/home";
import ClockIcon from "@mysticcase/icons/Clock";
import FamilyIcon from "@mysticcase/icons/Family";
import FriendsIcon from "@mysticcase/icons/Friends";
import Page from "@mysticcase/layout/Page";
import Row from "@mysticcase/layout/Row";

import styles from "@styles/pages/home.module.scss";

const features: Array<Feature> = [
    { name: "Perfect Family Activity", text: "Spend quality time all together - there is something for everyone!", imageUrl: "/assets/images/family.jpeg" },
    { name: "Fun Activity for Couples", text: "Hang out with your partner instead of just watching TV", imageUrl: "/assets/images/couple.jpeg" },
    { name: "Friends Gathering", text: "A fun activity for friends to do and spend time in a new unusual way", imageUrl: "/assets/images/friends.jpeg" }
];

const requirements: Array<Requirement> = [{
    icon: <ClockIcon delay={0} />,
    text: "Time about 2 hours",
    delay: 0,
}, {
    icon: <FamilyIcon delay={400} />,
    text: "Age from 7+ to adult",
    delay: 400,
}, {
    icon: <FriendsIcon delay={800} />,
    text: "Team from 2-5 persons",
    delay: 800,
}];

export const HomePage = () => (
    <Page className={styles["mc-home-page"]}>
        <Row>
            <Main />
        </Row>
        <Row className={styles["mc-stripe-row"]}>
            <Stripe>
                Escape room in a box right at home&nbsp;
            </Stripe>
        </Row>
        <Row>
            <Features content={features} />
        </Row>
        <Row className={styles["mc-requirements-row"]}>
            <Requirements requirements={requirements}/>
        </Row>
        <Row className={styles["mc-products-row"]}>
            <Products />
        </Row>
        <Row className={styles["mc-video-introduction-row"]}>
            <VideoIntroduction />
        </Row>
        <Row className={styles["mc-pmc-row"]}>
            <PlanetMysticCase />
        </Row>
        <Row className={styles["mc-stripe-row"]}>
            <Stripe>
                New way to spend pleasure time at home&nbsp;
            </Stripe>
        </Row>
        <Row className={styles["mc-dsc-row"]}>
            <Description />
        </Row>
        <Row className={styles["mc-feedback-row"]}>
            <FeedbackSection />
        </Row>
        <Row className={styles["mc-faq-row"]}>
            <FAQ />
        </Row>
    </Page>
);

export default HomePage;
