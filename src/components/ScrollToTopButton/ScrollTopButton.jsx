import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@react-hooks-library/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Link, animateScroll as scroll } from "react-scroll";
import styles from "./scrollTopButton.module.css"

export default function ScrollTopButton() {

    const [displayBtn, setDisplayBtn] = useState(false);
    const { height } = useWindowSize();
    const clientWindowHeight = useRef();
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            if (height && (height !== Number.POSITIVE_INFINITY)) {
                clientWindowHeight.current = height
            }
        }
    }, [height]);

    useScrollPosition(({ currPos }) => {
        if (-currPos.y > 50) {
            setDisplayBtn(true)
        } else {
            setDisplayBtn(false)
        }
    })
    // const scrollToTop = () => {
    //     scroll.scrollToTop()
    // }
    return (
        <Link
            activeClass="active"
            to="topSection"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`${styles.fixedToTopBtn} ${displayBtn ? styles.show : styles.hide}`}
        >
            {/* To Top */}
        </Link>
    );
}
