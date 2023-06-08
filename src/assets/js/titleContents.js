import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';

export async function getTitleContentsByID(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/${_id}`)
    .then(res => res.data)
  return response
}

//* LIST
export async function getEditorSitemapUrls(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor?limit=9999&pageNumber=1`)
    .then(res => res.data)
    //唯二不產URL的只有uncategorized && 未發布
    .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"))
    .then(titleContents => titleContents.filter(content => content.sitemapUrl.indexOf('/p_') !== -1))


  const idArray = response.reduce((acc, curr) => {
    return [...acc, getRenamedContent(curr.sitemapUrl)]
  }, [])
  return idArray
}
//* LIST
export async function getTitleContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor?limit=9999&pageNumber=1`)
    .then(res => res.data)
    // .then(res => { console.log(res); return res })
    .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"))
    .then(res => res.map(content => {
      return {
        ...content,
        headTitle: content.headTitle && content.headTitle.length > 0
          ? content.headTitle : content.title,
      }
    }))
  // .then(res => { console.log(res); return res })
  return response
}

export async function getCategoryInfo(payload) {
  const { categoryName, apiUrl } = payload
  const response = await instance(apiUrl).get(`/category/${categoryName}`)
    .then(res => res.data)
  // console.log("🚀 ~ file: titleContents.js:31 ~ getCategoryInfo ~ response:", response)
  return response
}


//* LIST
export async function getTitleContentsByCategory(payload) {
  const { categoryName, page, apiUrl } = payload
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
    // .then(res => { console.log(res); return res })
    .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized" && item.hidden === false))
  // .then(res => { console.log(res); return res })
  return response
}

//* LIST
export async function getTitleContentsByCategoryAndGetOnlyID(payload) {
  const { categoryName, page, apiUrl } = payload
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
  const { data } = response
  const idArray = data.reduce((acc, curr) => {
    return [...acc, curr._id]
  }, [])
  return idArray
}

//* LIST
export async function getRelatedArticles(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/relatedArticles/${_id}`)
    .then(res => res.data)
    // .then(res => { console.log(res); return res })
    .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized" && item.hidden === false))
  // .then(res => { console.log(res); return res })
  return response
}


//! deprecated
// export async function getTitleContentsByTag(payload) {
//   const { tag, apiUrl } = payload
//   const response = await instance(apiUrl).get(`/editor/tag/${tag}`)
//     .then(res => res.data)
//     .then(res => { console.log(res); return res })
//     .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized" && item.hidden === false))
//     .then(res => { console.log(res); return res })
//   return response
// }

//! deprecated
// export async function postLikeWithID(payload) {
//   const { id, apiUrl } = payload
//   const response = await instance(apiUrl).post(`/editor/like/${id}`, {
//     thumbUp: "LIKE+1"
//   })
//     .then(res => res.data)

//   return response
// }

