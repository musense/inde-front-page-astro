import React from 'react'
import styles from './hamburger.module.css'

const Hamburger = React.forwardRef(function Hamburger({
    unCheck
},
    ref) {

    // function handClick(e) {        
    //     toggleHamburger(e)
    // }

    return (
        <div className={styles['hamburger']}>
            <input ref={ref}
                type="checkbox"
                name="hamburger-check" />
            <span></span>
            <span></span>
            <span></span>
            <button onClick={unCheck} type="button"
                style={{
                    position: 'absolute',
                    display: 'none',
                    right: '10000rem',
                }} />
        </div>
    )
})

export default Hamburger