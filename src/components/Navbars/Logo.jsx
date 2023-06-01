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
        ? (<div style={{ zIndex: zIndex }} onClick={() => window.open('/', '_self')} className={styles['navbar-logo']}></div>)
        : (<div style={{ zIndex: zIndex }} className={styles['navbar-logo']}></div>)
}
