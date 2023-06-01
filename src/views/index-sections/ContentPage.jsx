import React, { useEffect, useState, useCallback } from 'react';
import styles from './contentPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import ContentPageLeft from './ContentPageLeft';
import InterestedContents from '@views/index-sections/InterestedContents';

import { animateScroll as scroll } from "react-scroll";


const mobileItem = {
  image: import('@assets/img/mobile/index/banner.png'),
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};
const pcItem = {
  image: import('@assets/img/index/banner.png'),
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};


function ContentPage({ category, mainContent, relatedArticles, titleContents }) {

  const clientWidth = localStorage.getItem('clientWidth');

  const [item, setItem] = useState();

  const scrollToPosition = useCallback((top = 520) => {
    if (!clientWidth) return
    if (clientWidth <= 768)
      top = 250
    scroll.scrollTo(top, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, [clientWidth])
  const [_theContent_, setTheContent] = useState(null);
  const [prevInfo, setPrevInfo] = useState(null);
  const [nextInfo, setNextInfo] = useState(null);
  const [interestedContents, setInterestedContents] = useState(null);

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
    console.log("🚀 ~ file: ContentPage.jsx:46 ~ findOneByIdAndReturnPrevNextID ~ serialNumber:", serialNumber)
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
    scrollToPosition()
    let bannerImport
    if (clientWidth <= 768) {
      bannerImport = mobileItem.image
      bannerImport.then(res => setItem({
        src: res.default.src,
        altText: mobileItem.altText,
        title: mobileItem.title,
      }))
    } else {
      bannerImport = pcItem.image
      bannerImport.then(res => setItem({
        src: res.default.src,
        altText: pcItem.altText,
        title: pcItem.title,
      }))
    }
  }, [scrollToPosition, clientWidth]);



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




