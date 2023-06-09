import React from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'


export default function NavButton({
    // selectedCategoryName, 
    category }) {
    const CategoryShowName = category.name.charAt(0).toUpperCase() + category.name.slice(1);
    const pathname = localStorage.getItem('pathname');
    console.log("🚀 ~ file: NavButton.jsx:11 ~ pathname:", pathname)
    const selectedCategoryName = localStorage.getItem('categoryName')
    return (
        <NavItem>
            <a href={`/${category.sitemapUrl}`} target="_self"
                className={`${styles['navButton']} ${selectedCategoryName === category.name ? styles['active'] : ''}`}>
                {CategoryShowName}
            </a>
        </NavItem >
    )
}
