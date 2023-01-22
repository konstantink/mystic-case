import * as React from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";

interface TruncateTextProps {
    truncateBy: "letters" | "words";
    className?: string;
    limit: number;
    showMore?: boolean;
    url?: string;
}

export default styled(({
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
})(({ theme }) => `
    color: #231E52;
    font-family: Pangram;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.3px;
    line-height: 30px;
    margin-bottom: ${theme.spacing(4)};
`);
