import React from "react";
import clsx from "clsx";

import styles from "@styles/layout/row.module.scss";

interface RowProps {
    className?: string;
}

export const Row = ({ children, className }: React.PropsWithChildren<RowProps>) => (
    <div className={className ? clsx(styles["mc-row-wrapper"], className) : styles["mc-row-wrapper"]}>
        {children}
    </div>
);

export default Row;
