import React, { useEffect, useState } from 'react'
import styles from './logo.module.css'

export default function Logo({ active, zIndex }) {
    const [prevState, setPrevState] = useState(true);
    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setPrevState(active)
            }, 500)
        }
    }, [active]);
    return prevState
        ? (<a href={'/'}
            target='_self'
            style={{ zIndex: zIndex }}
            className={styles['navbar-logo']}></a>)
        : (<div style={{ zIndex: zIndex }} className={styles['navbar-logo']}></div>)
}
