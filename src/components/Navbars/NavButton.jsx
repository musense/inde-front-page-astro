import React, { useEffect, useState } from 'react'
// import { NavLink, useLocation } from "react-router-dom";
import { NavItem } from "reactstrap";
import { css } from '@emotion/css'
import styles from './navButton.module.css'


export default function NavButton({ category, closeMenu }) {

    const CategoryShowName = category.charAt(0).toUpperCase() + category.slice(1);

    // const { pathname } = useLocation();
    const [pathName, setPathName] = useState(null);
    useEffect(() => {
        if (!window) return
        setPathName(window.location.pathname)
      }, []);
    const selectedCategory = (category) => {
        const path = category.substring(category.lastIndexOf("/") + 1, category.length)
        if (path === '') return 'home'
        else return path
    }

    return (
        <NavItem>
            <a
                // onClick={closeMenu}
                href={`${category === 'home' ? '/' : `/c/${category}`}`}
                className={`${styles['navButton']} 
                ${pathName && selectedCategory(pathName) === category
                        ? styles['active']
                        : ''
                    }`
                }
            >
                {CategoryShowName}
            </a>
        </NavItem >
    )
}
