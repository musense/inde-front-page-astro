import React, { useEffect, useState, useContext } from 'react'
import styles from "./goToContentPage.module.css";
import GoToBtn from "./goToBtn"

export default function GoToContentPage({
    prevInfo,
    nextInfo
}) {
    console.log("🚀 ~ file: goToContentPage.jsx:9 ~ prevInfo:", prevInfo)
   
    return <div className={styles['content-btn']}>
        {prevInfo && <GoToBtn category={prevInfo.category} title={prevInfo.title} id={prevInfo._id} type='prev' />}
        {nextInfo && <GoToBtn category={nextInfo.category} title={nextInfo.title} id={nextInfo._id} type='next' />}
    </div>;
}
