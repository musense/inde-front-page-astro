import { instance } from "./AxiosInstance";

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

export async function getTagsContents(payload) {
    console.log("🚀 ~ file tagContents.js:4 ~ getTagsContents ~ payload:", payload)
    const { tagName, page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/tagSearch/${tagName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data)
    console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContents ~ response:", response)

    return response
}