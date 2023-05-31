import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './commonPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import ConnectContent from '@components/ConnectContent/ConnectContent';

import PageTemplate from "@components/page/pageTemplate";
import DecoBackground from "@components/DecoBackground/DecoBackground";
import Banner from '@components/Banner/Banner';

import { animateScroll as scroll } from "react-scroll";

function CommonPage({ paramName, data }) {
    console.log("🚀 ~ file: commonPage.jsx:21 ~ CommonPage ~ data:", data)
    const state = {
        clientWidth: 1920
    }

    const Background = useCallback(({ showOn }) => {
        // console.log("🚀 ~ file: commonPage.jsx:60 ~ Background ~ showOn:", showOn)
        // console.log("🚀 ~ file: commonPage.jsx:59 ~ Background ~ state.clientWidth:", state.clientWidth)
        if (!state.clientWidth) return
        // mobile using
        if (state.clientWidth < 400) {
            switch (showOn) {
                case "mobile": {
                    return (<DecoBackground
                        repeat={'repeat'}
                        position={'fixed'}
                        offset={'0.2rem'}
                    />)
                }
                case "desktop": {
                    return (<></>)
                }
            }
        } else {
            // desktop using
            switch (showOn) {
                case "mobile": {
                    return (<></>)
                }
                case "desktop": {
                    return (<DecoBackground
                        repeat={'repeat'}
                        position={'absolute'}
                    />)
                }
            }
        }

    }, [state.clientWidth])

    const scrollToTop = useCallback(() => {
        scroll.scrollTo(0, {
            duration: 500,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }, [])

    const scrollToPosition = useCallback((top=250) => {
        if (!state.clientWidth) return
        if (state.clientWidth < 400)
            top = 240
        scroll.scrollTo(top, {
            duration: 500,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }, [state.clientWidth])

    const bannerRef = useRef()
    const [__ALL_CONTENT__, setAllContent] = useState(null);
    const [viewContents, setViewContents] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useMemo(() => {
        // console.log("🚀 ~ file: commonPage.jsx:94 ~ CommonPage ~ data:", data)
        setAllContent(data);
        setCurrPage(1);
        setTotalPages(Math.ceil(data.length / 6));
    }, [data]);

    useEffect(() => {
        if (!paramName) return

        if (paramName.indexOf("#") === -1) {
            scrollToTop()
        } else {
            scrollToPosition()
        }
        // if (!state.clientWidth) {
        //     dispatch({
        //         type: 'SET_WINDOW_SIZE',
        //         payload: {
        //             width: window.innerWidth || document.documentElement.clientWidth ||
        //                 document.body.clientWidth,
        //             height: window.innerHeight || document.documentElement.clientHeight ||
        //                 document.body.clientHeigh
        //         }
        //     })
        // }
        // }, [dispatch, scrollToTop, state.clientWidth]);
    }, [paramName, scrollToPosition, scrollToTop, state.clientWidth]);

    useMemo(() => {
        // console.log("🚀 ~ file: commonPage.jsx:155 ~ useMemo ~ __ALL_CONTENT__:", __ALL_CONTENT__)
        if (__ALL_CONTENT__) {
            const start = 0 + (currPage - 1) * 6,
                end = currPage * 6;
            setViewContents(__ALL_CONTENT__.slice(start, end))
        }
    }, [__ALL_CONTENT__, currPage])

    const goPreviousPage = useCallback(() => {
        setCurrPage(page => parseInt(page) - 1)
        scrollToPosition()
    }, [scrollToPosition])

    const goNextPage = useCallback(() => {
        setCurrPage(page => parseInt(page) + 1)
        scrollToPosition()
    }, [scrollToPosition])

    const setPage = useCallback((page) => {
        setCurrPage(parseInt(page))
        scrollToPosition()
    }, [scrollToPosition])

    const Page = useCallback(() => {
        if (state.clientWidth < 400) {
            return <PageTemplate
                prevPage={goPreviousPage}
                nextPage={goNextPage}
                setPage={setPage}
                currentPage={currPage}
                totalPages={totalPages}
                maxShowNumbers={3}
            />
        } else {
            return <PageTemplate
                prevPage={goPreviousPage}
                nextPage={goNextPage}
                setPage={setPage}
                currentPage={currPage}
                totalPages={totalPages}
                maxShowNumbers={5}
            />
        }
    }, [currPage, goNextPage, goPreviousPage, setPage, state.clientWidth, totalPages])
    return (
        <>

            <Banner ref={bannerRef} category={paramName} />
            <div id="categoryName" className={`${styles['category-name']} title`}>
                {paramName}
            </div>

            <div id="category-anchor" />
            <div className={styles['category-decoration-image-wrapper']}>
                <IndexDecorationImage
                    marginTop={44}
                    marginBottom={96}
                    imageType={'line'} />
                <IndexDecorationImage
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                    imageType={'line'} />
            </div>
            <Background showOn={'mobile'} />
            {viewContents && viewContents.length !== 0 ? (<div className={`${styles['main-content']}`}>
                <Background showOn={'desktop'} />
                {viewContents.map((content, index) =>
                    <ConnectContent key={index} index={index} content={content} />
                )}
                <Page />
            </div>
            ) : (
                <h3 style={{
                    color: 'grey',
                    width: '100%',
                    textAlign: 'center',
                }}>There's no articles</h3>
            )}
            <div className={styles['category-decoration-image-wrapper']}>
                <IndexDecorationImage
                    marginTop={73}
                    marginBottom={83}
                    imageType={'line'} />
                <IndexDecorationImage
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                    imageType={'line'}
                />
            </div>

        </>
    );
}

export default CommonPage;