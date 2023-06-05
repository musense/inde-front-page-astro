import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// reactstrap components
import { Navbar, Nav, Container } from "reactstrap";

import styles from './indexNavbar.module.css'
import Logo from "./Logo";
import NavButton from "./NavButton";
import Hamburger from "@components/Hamburger/Hamburger";
import NavBackDrop from "./NavBackDrop";


function IndexNavbar() {

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [active, setActive] = useState(false);

  const stopPropagationAndToggleHamburger = useCallback((e) => {
    e.stopPropagation()
    toggleHamburger(e)
  }, [])
  const unCheck = useCallback((e) => {
    const hamburgerCheck = hamburgerRef.current;
    setActive(false)
    hamburgerCheck.checked = false;
  }, [active])

  useEffect(() => {
    const clientWidth = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth
    const pathname = window.location.pathname
    setLastPagePathnameInLocalStorage();
    // setTimeout(() => {
    setClientWidthInLocalStorage(clientWidth);
    setPathnameInLocalStorage(pathname);

    // }, 0)
  }, []);
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


function setClientWidthInLocalStorage(clientWidth) {
  if (!(localStorage.getItem("clientWidth") && localStorage.getItem("clientWidth") == clientWidth)) {
    localStorage.setItem("clientWidth", clientWidth);
  }
}

function setPathnameInLocalStorage(pathname) {
  if (!pathname) return
  if (!(localStorage.getItem("pathname") && localStorage.getItem("pathname") == pathname)) {
    pathname = window.location.pathname;
    localStorage.setItem("pathname", window.location.pathname);
  }
}

function setLastPagePathnameInLocalStorage() {
  const lastPagePathname = localStorage.getItem("pathname");
  console.log("🚀 ~ file: IndexNavbar.jsx:91 ~ setPathnameInLocalStorage ~ lastPagePathname:", lastPagePathname);
  if (lastPagePathname) {
    localStorage.setItem("last-page-pathname", lastPagePathname);
  }
}

function setCategoryNameInLocalStorageAndReturn(pathname) {
  if (!pathname) return
  let categoryName;
  if (pathname.indexOf("/c/") !== -1) {
    if (pathname.indexOf("/p/") !== -1) {
      categoryName = pathname.split("/c/")[1].split("/p/")[0];
      localStorage.setItem("categoryName", categoryName);
      console.log("🚀 ~ file: IndexNavbar.jsx:31 ~ useEffect ~ category:", categoryName);
    } else {
      categoryName = pathname.split("/c/")[1];
      categoryName = categoryName.replace("/", "")
      console.log("🚀 ~ file: IndexNavbar.jsx:31 ~ useEffect ~ categoryName:", categoryName);
    }
    localStorage.setItem("categoryName", categoryName);
  } else {
    categoryName = 'home'
    localStorage.setItem("categoryName", categoryName);
  }
  return categoryName
}

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
  navRef
}) {

  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const indexButtonList = ['home', 'lottery', 'sports', 'poker', 'matka', 'casino']
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
      const liList = navRef.current.querySelectorAll("li")
      liList.forEach(li => {
        li.addEventListener("touchstart", liHandler)
      })
      const pathname = localStorage.getItem("pathname")
      const selectedCategory = setCategoryNameInLocalStorageAndReturn(pathname);
      console.log("🚀 ~ file: IndexNavbar.jsx:168 ~ useEffect ~ selectedCategory:", selectedCategory)
      if (pathname && pathname.indexOf('/t/') !== -1) {
        // return null;
        setSelectedCategoryName(undefined)
      } else {
        // return selectedCategory
        setSelectedCategoryName(selectedCategory)
      }
    }
  }, [navRef.current]);


  const activeStyle = active ? 'active' : null
  return <Nav
    style={{ zIndex: zIndex }}
    className={`${styles['nav-btn-wrapper']} ${styles[activeStyle]}`}>
    <div ref={navRef}>
      {indexButtonList.map((item, index) => {
        return <NavButton
          key={index}
          selectedCategoryName={selectedCategoryName}
          category={item}
        />;
      })}
    </div>
  </Nav>;
}

