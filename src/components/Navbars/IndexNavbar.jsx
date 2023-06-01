import React, { useCallback, useEffect, useRef, useState } from "react";
// reactstrap components
import { Navbar, Nav, Container } from "reactstrap";

import styles from './indexNavbar.module.css'
import Logo from "./Logo";
import NavButton from "./NavButton";
import Hamburger from "@components/Hamburger/Hamburger";
import NavBackDrop from "./NavBackDrop";

const indexButtonList = ['home', 'lottery', 'sports', 'poker', 'matka', 'casino']

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
  const unCheck = useCallback((e) => {
    console.log("🚀 ~ file: IndexNavbar.jsx:68 ~ unCheck ~ unCheck:", 'unCheck!!!!!!')
    const hamburgerCheck = hamburgerRef.current;
    setActive(false)
    hamburgerCheck.checked = false;
  }, [active])
  useEffect(() => {
    const clientWidth = localStorage.getItem("clientWidth")
    if (clientWidth <= 768) {
      if (hamburgerRef.current == null && navRef.current === null) {
        return
      } else {
        hamburgerRef.current.addEventListener('click', stopPropagationAndToggleHamburger, false)
        hamburgerRef.current.addEventListener('touchstart', stopPropagationAndToggleHamburger, false)
      }
    }

  }, [hamburgerRef]);

  const toggleHamburger = (e) => {
    console.log("Clicked, new value = " + e.target.checked);
    setActive(e.target.checked)
  }


  return (
    <Header>
      <NavBackDrop
        active={active}
        unCheck={unCheck}
        zIndex={2}
      />
      <Logo
        zIndex={1}
        active={active}
      />
      <NavWrapper
        active={active}
        navRef={navRef}
        indexButtonList={indexButtonList}
        unCheck={unCheck}
        zIndex={3}
      />
      <Hamburger
        ref={hamburgerRef}
        unCheck={unCheck}
        zIndex={3}
      />
    </Header>
  );
}

export default IndexNavbar;


function Header({ children }) {
  return <Navbar id="navbar" className={`fixed-top ${styles.navbar} ${styles.show}`}>
    <Container className={styles.container}>
      {children}
    </Container>
  </Navbar>;
}

function NavWrapper({
  active,
  zIndex,
  navRef,
  indexButtonList,
  unCheck
}) {

  const navHandler = useCallback((e) => {
    console.log(e.type)
    e.preventDefault()
  }, [])
  const liHandler = (e) => {
    console.log(e);
    e.stopPropagation()
  }
  useEffect(() => {
    if (navRef.current === null) {
      return
    } else {
      navRef.current.addEventListener("touchstart", navHandler)
      navRef.current.addEventListener("wheel", navHandler)
      navRef.current.addEventListener("scroll", navHandler)
      navRef.current.addEventListener("touchmove", navHandler)
      console.log("🚀 ~ file: IndexNavbar.jsx:151 ~ useEffect ~ navRef.current:", navRef.current)
      const liList = navRef.current.querySelectorAll("li")
      liList.forEach(li => {
        li.addEventListener("touchstart", liHandler)
        console.log("🚀 ~ file: IndexNavbar.jsx:151 ~ useEffect ~ li:", li)
      })
    }
  }, [navRef.current]);

  const activeStyle = active ? 'active' : null
  return <Nav
    style={{
      zIndex: zIndex,
    }}
    className={`${styles['nav-btn-wrapper']} ${styles[activeStyle]}`}>
    <div ref={navRef}>
      {indexButtonList.map((item, index) => {
        return <NavButton
          closeMenu={unCheck}
          key={index}
          category={item}
        />;
      })}
    </div>
  </Nav>;
}

