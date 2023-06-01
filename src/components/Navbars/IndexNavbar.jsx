import React, { useCallback, useEffect, useRef, useState } from "react";
// reactstrap components
import { Navbar, Nav, Container } from "reactstrap";

import styles from './indexNavbar.module.css'
import Logo from "./Logo";
import NavButton from "./NavButton";
import Hamburger from "@components/Hamburger/Hamburger";

function IndexNavbar() {

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [active, setActive] = useState(false);


  useEffect(() => {    
    const clientWidth = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth
    const pathname = window.location.pathname
    console.log("🚀 ~ file: IndexNavbar.jsx:18 ~ useEffect ~ clientWidth:", clientWidth)
    console.log("🚀 ~ file: IndexNavbar.jsx:18 ~ useEffect ~ pathname:", pathname)
    if (!(localStorage.getItem("clientWidth") && localStorage.getItem("clientWidth") == clientWidth)) {
      localStorage.setItem("clientWidth", clientWidth)
    }
    if (!(localStorage.getItem("pathname") && localStorage.getItem("pathname") == pathname)) {
      localStorage.setItem("pathname", window.location.pathname)
    }
  }, []);


  const stopPropagationAndToggleHamburger = useCallback((e) => {
    e.stopPropagation()
    toggleHamburger(e)
  }, [])
  const preventClick = (e) => {
    e.stopPropagation();
  }
  const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const unCheck = useCallback((e) => {
    if (!active) return
    e.preventDefault()
    console.log("🚀 ~ file: IndexNavbar.jsx:68 ~ unCheck ~ unCheck:", 'unCheck!!!!!!')
    const hamburgerCheck = hamburgerRef.current;
    setActive(false)
    hamburgerCheck.checked = false;
  }, [active])
  // useEffect(() => {

  //   if (state.clientWidth < 400) {
  //     if (hamburgerRef.current == null && navRef.current === null) {
  //       return
  //     } else {
  //       document.body.addEventListener("click", unCheck)
  //       document.body.addEventListener("touchstart", unCheck)
  //       document.body.addEventListener("scroll", unCheck)
  //       hamburgerRef.current.addEventListener('click', stopPropagationAndToggleHamburger, false)
  //       hamburgerRef.current.addEventListener('touchstart', stopPropagationAndToggleHamburger, false)
  //       navRef.current.addEventListener('click', preventClick, false)
  //       navRef.current.addEventListener('touchstart', preventClick, false)
  //       navRef.current.addEventListener('touchmove', preventScroll, false)
  //       navRef.current.addEventListener('wheel', preventScroll, false)
  //       navRef.current.addEventListener('scroll', preventScroll, false)
  //     }
  //     const myBody = document.body;
  //     const myHamburgerRef = hamburgerRef.current;
  //     const myNavRef = navRef.current;
  //     return () => {
  //       myBody.removeEventListener("click", unCheck)
  //       myBody.removeEventListener("touchstart", unCheck)
  //       myBody.removeEventListener("scroll", unCheck)

  //       myHamburgerRef.removeEventListener('click', stopPropagationAndToggleHamburger)
  //       myHamburgerRef.removeEventListener('touchstart', stopPropagationAndToggleHamburger)

  //       myNavRef.removeEventListener('click', preventClick)
  //       myNavRef.removeEventListener('touchstart', preventClick)
  //       myNavRef.removeEventListener('touchmove', preventScroll)
  //       myNavRef.removeEventListener('wheel', preventScroll)
  //       myNavRef.removeEventListener('scroll', preventScroll)
  //     }
  //   }

  // }, [hamburgerRef, navRef, state.clientWidth, stopPropagationAndToggleHamburger, unCheck]);

  const toggleHamburger = (e) => {
    console.log("Clicked, new value = " + e.target.checked);
    setActive(e.target.checked)
  }



  const indexButtonList = ['home', 'lottery', 'sports', 'poker', 'matka', 'casino']
  return (
    <>
      <Navbar id="navbar" className={`fixed-top ${styles.navbar} ${styles.show}`}>
        <Container className={styles.container}>
          <Logo />
          <Nav className={`${styles['nav-btn-wrapper']} ${active ? styles['active'] : ''}`}>
            <div ref={navRef}>
              {indexButtonList.map((item, index) => {
                return <NavButton

                  closeMenu={unCheck}
                  key={index}
                  category={item}

                />
              })}
            </div>
          </Nav>
          <Hamburger
            ref={hamburgerRef}
            unCheck={unCheck}
          />
        </Container>
      </Navbar >
    </>
  );


}

export default IndexNavbar;



