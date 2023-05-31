import React from 'react'
// import { useNavigate } from "react-router-dom";
import styles from './goToBtn.module.css';

export default function GoToBtn({ category, title, id, type }) {
    // const navigate = useNavigate()
    function goToContent(contentID) {
        if (contentID === null) return
        window.open(`/c/${category}/p/${contentID}`, "_self")
    }
    return (id && title) && (
        // <div >
        <a title={title} href={`/c/${category}/p/${id}`}
            className={`${styles.btn} ${type === 'prev'
                ? styles['prev-btn']
                : type === 'next'
                    ? styles['next-btn']
                    : ''}`}>{title}

        </a>
        // </div>
    );
}
