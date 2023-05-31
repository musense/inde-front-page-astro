import React, { useEffect, useState } from 'react'
import styles from './banner.module.css'

const imageMap = new Map([
    ['lottery', import('@assets/img/category/lottery.png')],
    ['sports', import('@assets/img/category/sports.png')],
    ['poker', import('@assets/img/category/poker.png')],
    ['matka', import('@assets/img/category/matka.png')],
    ['casino', import('@assets/img/category/banner.png')],
])

const Banner = React.forwardRef(function Banner(
    { category = 'casino' }
    , ref
) {

    const [image, setImage] = useState(null);

    useEffect(() => {
        let bannerImport = imageMap.get(category)
        if (!bannerImport) {
            bannerImport = imageMap.get('casino')
        }
        bannerImport.then(res => setImage(res.default.src))
    }, [category]);

    // console.log(`🚀 ~ file tagPage.jsx:122 ~ banner ~ imageMap.get('${category}'):`, imageMap.get(category))
    return image && (<div ref={ref} className={`section ${styles.section}`}>
        <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" >
            <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </a>
    </div>)
}
);

export default Banner