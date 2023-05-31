import React, { useState, useEffect, useRef } from 'react'
import styles from './pageTemplate.module.css'

const PageTemplate = ({
    prevPage,
    nextPage,
    setPage,
    currentPage: currentPageProp,
    totalPages,
    maxShowNumbers = 5
}) => {


    const [showArray, setShowArray] = useState(null);
    const currentPageRef = useRef(null)
    const currentPage = parseInt(currentPageProp)
    console.log("🚀 ~ file pageTemplate.jsx:16 ~ totalPages:", totalPages)
    console.log("🚀 ~ file pageTemplate.jsx:16 ~ currentPage:", currentPage)
    console.log("🚀 ~ file pageTemplate.jsx:16 ~ Math.ceil(maxShowNumbers / 2):", Math.ceil(maxShowNumbers / 2))
    const skip = !!currentPageRef.current && currentPageRef.current !== currentPage

    const anchorButton = ({ cb, styles, label, index = null }) => {
        if (index === null) {
            return (<a onClick={cb} value="<"
                href={`${localStorage.getItem('pathname')}#category-anchor`}
                className={styles}>{decodeURIComponent(label)}</a>)
        }
        return (<a onClick={cb} value="<" key={index}
            href={`${localStorage.getItem('pathname')}#category-anchor`}
            className={styles}>{decodeURIComponent(label)}</a>)
    }

    useEffect(() => {
        const array = Array.from(Array(maxShowNumbers), (_, index) => index - Math.floor(maxShowNumbers / 2))
            .map(item => parseInt(item) + currentPage);
        setShowArray(array);
        currentPageRef.current = currentPage
    }, [maxShowNumbers, currentPage]);

    return (
        <div className={styles['page-wrapper']}>
            <div>
                {
                    anchorButton({
                        cb: () => { prevPage() },
                        styles: currentPage === 1 ? styles.displayNone : "",
                        label: encodeURIComponent('<')
                    })
                }
                {totalPages - currentPage < Math.floor(maxShowNumbers / 2) && totalPages > maxShowNumbers && (
                    <p>···</p>
                )}
                {showArray && showArray
                    .map((item, index) => {
                        if (item <= 0)
                            return;
                        if (item > totalPages)
                            return;
                        console.log(`🚀 ~ file pageTemplate.jsx: item `, item);
                        return anchorButton({
                            index: index,
                            cb: () => setPage(item),
                            styles: currentPage === parseInt(item) ? styles.active : "",
                            label: encodeURIComponent(item)
                        })
                    })}
                {currentPage < Math.ceil(maxShowNumbers / 2) && totalPages > maxShowNumbers && (
                    <p>···</p>
                )}
                {
                    anchorButton({
                        cb: () => nextPage(),
                        styles: currentPage === totalPages || totalPages === 0 ? styles.displayNone : "",
                        label: encodeURIComponent('>')
                    })
                }
            </div>
        </div>
    );
}


export default PageTemplate