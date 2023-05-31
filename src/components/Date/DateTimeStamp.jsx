import React from 'react'

import styles from './dateTimeStamp.module.css'

const dateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const timeOption = {
    hour: '2-digit',
    hour12: false,
    hourCycle: 'h24',
    minute: '2-digit',
};
export default function DateTimeStamp({date}) {
    return date && (<div className={styles['title-main-date']}>
        <span className={styles['create-date']}>
            {new Date(date).toLocaleDateString(
                undefined,
                dateOption
            )}
            &nbsp; &nbsp;
            {new Date(date).toLocaleTimeString(
                undefined,
                timeOption
            )}
        </span>
    </div>);
}