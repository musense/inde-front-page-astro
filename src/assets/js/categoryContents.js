import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';

const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino'];

//* LIST
export async function getCategoryList(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data.data)
        // .then(res => { console.log(res); return res })
        // .then(res => { console.log(`🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:`, res); return res })
        .then(res => res.map(category => {
            return {
                ...category,
                headTitle: category.headTitle && category.headTitle.length > 0
                    ? category.headTitle : category.name
            }
        }))
    console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ response:", response)
    return response
}

//* LIST
export async function getCategorySitemapUrls(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data)
        // .then(res => { console.log(res); return res })
        .then(res => res.data.filter(item => item.name.toLowerCase() !== "uncategorized"))
    // .then(res => { console.log(res); return res })
    const idArray = response.reduce((acc, curr) => {
        return [...acc, getRenamedContent(curr.sitemapUrl)]
    }, [])
    return idArray
}