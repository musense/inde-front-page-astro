import React from "react";
import mainStyles from './navigateContainer.module.css'
// import { Link } from "react-router-dom";

function NavigateContainer({
    category,
    sitemapUrl,
    contentID: id,
    children,
    index,
    styles,
    customClassName = "title-container" }) {
        console.log("🚀 ~ file: NavigateContainer.jsx:13 ~ sitemapUrl:", sitemapUrl)
        // console.log("🚀 ~ file: NavigateContainer.jsx:12 ~ id:", id)

    if (styles === null || styles === '' || styles === undefined) {
        styles = mainStyles
    }

    return (<a
        // href={`/c/${category}/p/${id}`}
        href={sitemapUrl}
        className={styles[customClassName]}>
        {children}
    </a>);
}

export default NavigateContainer;