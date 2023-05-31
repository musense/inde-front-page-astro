import React from 'react'
// import { useNavigate } from "react-router-dom";
import styles from './logo.module.css'

export default function Logo() {
    // const navigate = useNavigate();
    return <div onClick={() => window.open('/', '_self')} className={styles['navbar-logo']}></div>;
}
