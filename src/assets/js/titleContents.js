import { instance } from "./AxiosInstance";

export async function getTitleContentsByID(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/${_id}`)
    .then(res => res.data)
  // const { data, currentPage, limit, totalCount, totalPages } = response
  // console.log("🚀 ~ file titleContents.js:6 ~ getTitleContents ~ response", response)
  return response
}

export async function getTitleContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor?limit=9999&pageNumber=1`)
    .then(res => res.data.data)
    .then(res => res.filter(content => !content.hidden))
    .then(res=> res.filter(content => content.categories.name !== "Uncategorized"))
    // .then(res => ({
    //   ...res,
    //   title: encodeURIComponent(res.title)
    // }))
  // const { data, currentPage, limit, totalCount, totalPages } = response
  // console.log("🚀 ~ file titleContents.js:6 ~ getTitleContents ~ response", response)
  return response
}

export async function getTitleContentsByCategory(payload) {
  const { categoryName, page, apiUrl } = payload
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
  const { data, currentPage, limit, totalCount, totalPages } = response
  // console.log("🚀 ~ file titleContents.js:6 ~ getTitleContentsByCategory ~ response", response)
  return response
}

export async function getTitleContentsByCategoryAndGetOnlyID(payload) {
  const { categoryName, page, apiUrl } = payload
  // console.log("🚀 ~ file: titleContents.js:36 ~ getTitleContentsByCategoryAndGetOnlyID ~ categoryName:", categoryName)
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
  const { data } = response
  // console.log("🚀 ~ file: titleContents.js:40 ~ getTitleContentsByCategoryAndGetOnlyID ~ data:", data)
  const idArray = data.reduce((acc, curr) => {
    return [...acc, curr._id]
  },[])
  // console.log("🚀 ~ file titleContents.js:6 ~ getTitleContentsByCategory ~ idArray", idArray)
  return idArray
}

export async function getRelatedArticles(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/relatedArticles/${_id}`)
    .then(res => res.data)
  const { data } = response
  // console.log("🚀 ~ file titleContents.js:27 ~ geRelatedArticles ~ data:", data)
  // return
  return data
}

export async function getTitleContentsByTag(payload) {
  const { tag, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/tag/${tag}`)
    .then(res => res.data)
  // const { data, currentPage, limit, totalCount, totalPages } = response
  // console.log("🚀 ~ file titleContents.js:13 ~ getTitleContentsByTag ~ response", response)
  return response
}

export async function postLikeWithID(payload) {
  const { id, apiUrl } = payload
  const response = await instance(apiUrl).post(`/editor/like/${id}`, {
    thumbUp: "LIKE+1"
  })
    .then(res => res.data)
  // const { data, currentPage, limit, totalCount, totalPages } = response
  // console.log("🚀 ~ file titleContents.js:22 ~ postLikeWithID ~ response", response)

  return response
}

