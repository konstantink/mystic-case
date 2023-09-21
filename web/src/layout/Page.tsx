import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import styles from "@styles/layout/page.module.scss";

interface PageProps {
    className?: string;
    name?: string;
 }

export const Page = ({ className, children }: React.PropsWithChildren<PageProps>) => (
    <div className={className}>
        <Header />
        <main className={styles["mc-main-rows"]}>
            {children}
        </main>
        <Footer />
    </div>
);

export default Page;
