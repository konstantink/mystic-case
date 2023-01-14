import * as React from "react";
import { Link } from "react-router-dom";

interface TruncateTextProps {
    truncateBy: "letters" | "words";
    className: string;
    limit: number;
    showMore?: boolean;
    url?: string;
}

export default ({
    children,
    truncateBy = "words",
    limit,
    className,
    showMore = false,
    url = "/",
}: React.PropsWithChildren<TruncateTextProps>) => {
    const [text, setText] = React.useState<string>("");

    React.useEffect(() => {
        if (children) {
            if (Array.isArray(children)) { // setText(children);
                const input = (children as Array<string>).reduce((prev: string, curr: string) => (`${prev} ${curr}`), "");
                setText(input);
            } else {
                setText(children as string);
            }
        }
    }, [children]);

    const truncateText = () => {
        if (truncateBy === "words") {
            const truncated = text.split(" ", limit);
            return `${truncated.join(" ")}... `;
        }
        return text;
    };

    return (
        <React.Fragment>
            <p className={className}>
                {truncateText()}
                {showMore ? (<Link to={url}>Read More</Link>) : ""}
            </p>
        </React.Fragment>
    );
};
