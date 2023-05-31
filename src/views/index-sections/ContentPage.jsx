import React, { useEffect, useState, useReducer, useContext, useRef, useCallback } from 'react';


// import { useParams } from 'react-router-dom';
// core components
import styles from './contentPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";

import ContentPageLeft from './ContentPageLeft';
import { getTitleContentsByID, getRelatedArticles, getTitleContents } from "@assets/js/titleContents";


import InterestedContents from '@views/index-sections/InterestedContents';

import { animateScroll as scroll } from "react-scroll";

// import { MainContext, MainDispatchContext } from "store/context";
// import { TitleContext } from "views/Index";


const mobileItem = {
  src: '/img/mobile/index/banner.png',
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};
const pcItem = {
  src: '/img/index/banner.png',
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};


function ContentPage({ category, mainContent, relatedArticles,titleContents }) {
  // console.log("🚀 ~ file: ContentPage.jsx:34 ~ ContentPage ~ data:", data)

  const state = {
    clientWidth: 1920
  }
  const [item, setItem] = useState();
  // const state = useContext(MainContext);
  // const dispatch = useContext(MainDispatchContext);
  console.log("🚀 ~ file ContentPage.jsx:26 ~ ContentPage ~ state:", state)

  const scrollToPosition = useCallback(() => {
    if (!state.clientWidth) return
    let top = 660
    if (state.clientWidth < 400)
      top = 342
    scroll.scrollTo(top, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, [state.clientWidth])
  const [_theContent_, setTheContent] = useState(null);
  const [prevInfo, setPrevInfo] = useState(null);
  const [nextInfo, setNextInfo] = useState(null);
  const [interestedContents, setInterestedContents] = useState(null);


  // const { categoryName: category, id } = useParams();

  const findOneByIdAndReturnPrevNextID = (arr = [], serialNumber = null) => {

    if (arr.length === 0) return null
    if (serialNumber === null || typeof serialNumber !== 'number') return null;
    console.log("🚀 ~ file: ContentPage.jsx:66 ~ findOneByIdAndReturnPrevNextID ~ arr:", arr)
    const mapContentInto = (content) => content && ({
      _id: content._id,
      category: content.categories.name,
      title: content.title,
    })
    //* basically, the bigger the serialNumber is, the newer the editor is
    const prevContent = arr.find(a => a.serialNumber === serialNumber - 1)
    const nextContent = arr.find(a => a.serialNumber === serialNumber + 1)

    const prevInfo = prevContent ? mapContentInto(prevContent) : null
    const nextInfo = nextContent ? mapContentInto(nextContent) : null

    console.log("🚀 ~ file ContentPage.jsx:69 ~ findOneByIdAndReturnPrevNextID ~ prevInfo:", prevInfo)
    console.log("🚀 ~ file ContentPage.jsx:69 ~ findOneByIdAndReturnPrevNextID ~ nextInfo:", nextInfo)
    setPrevInfo(prevInfo)
    setNextInfo(nextInfo)
  };
  useEffect(() => {
    setTheContent(mainContent)
    setInterestedContents(relatedArticles)
    findOneByIdAndReturnPrevNextID(titleContents, mainContent.serialNumber)
  }, []);
  useEffect(() => {
    scrollToPosition(0)
    // if (!state.clientWidth) {
    //   dispatch({
    //     type: 'SET_WINDOW_SIZE',
    //     payload: {
    //       width: window.innerWidth || document.documentElement.clientWidth ||
    //         document.body.clientWidth,
    //       height: window.innerHeight || document.documentElement.clientHeight ||
    //         document.body.clientHeigh
    //     }
    //   })
    // } else {
    // console.log("🚀 ~ file: ContentPage.jsx:71 ~ useEffect ~ state.clientWidth:", state.clientWidth)

    if (state.clientWidth < 400) {

      setItem({ ...mobileItem })
    } else {
      setItem({ ...pcItem })
    }
    // }

  }, [scrollToPosition, state.clientWidth]);



  return (
    <>
      {item && (
        <div className={`section ${styles.section}`}>
          <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" />
          <img src={item.src} alt={item.altText} title={item.title} width={'100%'} />
        </div>)
      }


      <ContentPageLeft
        content={_theContent_}
        prevInfo={prevInfo}
        nextInfo={nextInfo}
        category={category}
      />

      <div className={styles['contentPage-decoration-image-wrapper-pc']}>
        <IndexDecorationImage
          marginTop={66}
          marginBottom={52}
          imageType={'line'} />
      </div>

      <InterestedContents
        interestedContents={interestedContents} />

      <div className={styles['contentPage-decoration-image-wrapper-mobile']}>
        <IndexDecorationImage
          marginTop={'2rem'}
          marginBottom={'2rem'}
          imageType={'line'} />
      </div>
    </>
  );
}

export default ContentPage;




