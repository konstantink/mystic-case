import * as React from "react";
import { Link } from "react-router-dom";

import styles from "@styles/ui/common/truncatetext.module.scss";

interface TruncateTextProps {
    truncateBy: "letters" | "words";
    className?: string;
    limit: number;
    showMore?: boolean;
    url?: string;
}

type TruncateBy = "words" | "letters";

const truncateText = (text: string, truncateBy: TruncateBy, limit: number) => {
    if (truncateBy === "words") {
        const truncated = text.split(" ", limit);
        return `${truncated.join(" ")}... `;
    }
    return text;
};

export const TruncateText = ({
    children,
    truncateBy = "words",
    limit,
    showMore = false,
    url = "/",
}: React.PropsWithChildren<TruncateTextProps>) => {
    // const [text, setText] = React.useState<string>("");

    // React.useEffect(() => {
    //     if (children) {
    //         if (Array.isArray(children)) { // setText(children);
    //             const input = (children as Array<string>).reduce((prev: string, curr: string) => (`${prev} ${curr}`), "");
    //             setText(input);
    //         } else {
    //             setText(children as string);
    //         }
    //     }
    // }, [children]);

    const text = children && Array.isArray(children)
        ? (children as Array<string>).reduce((prev: string, curr: string) => (`${prev} ${curr}`), "")
        : children as string;

    return (
        <React.Fragment>
            <p className={styles["mc-truncate-text-text"]}>
                {truncateText(text, truncateBy, limit)}
                {showMore ? (<Link to={url}>Read More</Link>) : ""}
            </p>
        </React.Fragment>
    );
};

export default TruncateText;
