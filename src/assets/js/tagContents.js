import { instance } from "./AxiosInstance";

//* LIST
export async function getTagList(payload) {
    const { page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags?limit=9999&pageNumber=${page}`)
        .then(res => res.data.data)
    console.log("🚀 ~ file: tagContents.js:7 ~ getTagList ~ response:", response)

    return response
}

export async function getTagInfo(payload) {
    const { tagName, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/${tagName}`)
        .then(res => res.data)
    console.log("🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ response:", response)

    return response
}


//* LIST
export async function getTagsContents(payload) {
    console.log("🚀 ~ file tagContents.js:4 ~ getTagsContents ~ payload:", payload)
    const { tagName, page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/tagSearch/${tagName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data)
        // .then(res => { console.log(res); return res })
        .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized" && item.hidden === false))
        // .then(res => { console.log(res); return res })
    console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContents ~ response:", response)

    return response
}