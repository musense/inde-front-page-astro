import React from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'


export default function NavButton({ selectedCategoryName, category }) {
    const CategoryShowName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <NavItem>
            <a href={`${category === 'home' ? '/' : `/c/${category}`}`}
                className={`${styles['navButton']} ${selectedCategoryName === category ? styles['active'] : ''}`}>
                {CategoryShowName}
            </a>
        </NavItem >
    )
}
