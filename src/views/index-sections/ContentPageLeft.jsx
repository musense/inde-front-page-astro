import React, { useCallback, useContext, useEffect } from "react";
import Tag from "@components/Tag/Tag";
// import { Link } from "react-router-dom";
import GoToContentPage from "@components/page/goToContentPage";
import styles from './contentPageLeft.module.css'
import DecoBackground from "@components/DecoBackground/DecoBackground";
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import DateTimeStamp from "@components/Date/DateTimeStamp";



// import { MainContext } from "store/context";
// import { TitleContext } from "views/Index";

function ContentPageLeft({
  content,
  prevInfo,
  nextInfo,
  category }) {

  // const state = useContext(MainContext)

  const state = {
    clientWidth: 1920
  }

  const Background = useCallback(() => {
    if (state.clientWidth < 400) {
      return <DecoBackground
        repeat={'repeat'}
        position={'fixed'}
        offset={'0.2rem'}
      />
    } else {
      return (<DecoBackground
        repeat={'repeat'}
        position={'absolute'}
        offset={'-375px'}

      />)
    }
  }, [state.clientWidth])

  console.log("🚀 ~ file: ContentPageLeft.jsx:36 ~ useEffect ~ state.clientWidth:", state.clientWidth)

  return content && (
    <div className={styles['content-page']}>

      <Background />
      <div className={styles['left-content']}>


        <div className={styles['title-view']}>
          <a id='contentPage-return-button' className={styles['main-title-decoration']} href={`/c/${content.categories.name}`}>Return</a>
          <div className={styles['contentPageLeft-decoration-image-wrapper']}>
            <IndexDecorationImage
              marginTop={'2rem'}
              marginBottom={'2rem'}
              imageType={'line'} />
          </div>
          <h1 className={`${styles['main-title']} title`}>{content.title}</h1>
          <DateTimeStamp date={content.createdAt}/>
        </div>
        <div className={styles['main-content']}>
          <div>
            <div
              className={styles['title-main-content']}
              dangerouslySetInnerHTML={{ __html: content.htmlContent }}
            />

            <a className={styles['play-now']}
              href="https://www.zoobetin.com/?al=00034"
              target="_blank"
              rel="noopener noreferrer"
            />
            {(prevInfo || nextInfo) && <GoToContentPage
              prevInfo={prevInfo}
              nextInfo={nextInfo}
            />}
          </div>

          <div className={styles['content-side']}>
            <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" >
              <div className={styles['content-advertise']} />
            </a>
            <div className={styles['content-tags']}>
              <div>Tag</div>
              <div>
                {content.tags.map((tag, index) =>
                  <Tag key={index} tag={tag} />
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ContentPageLeft;

