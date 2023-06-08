import React from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'


export default function NavButton({ selectedCategoryName, category }) {
    const CategoryShowName = category.name.charAt(0).toUpperCase() + category.name.slice(1);

    return (
        <NavItem>
            <a href={category.sitemapUrl} target="_self"
                className={`${styles['navButton']} ${selectedCategoryName === category.name ? styles['active'] : ''}`}>
                {CategoryShowName}
            </a>
        </NavItem >
    )
}
