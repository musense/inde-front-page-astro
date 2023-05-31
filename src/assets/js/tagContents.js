import { instance } from "./AxiosInstance";

export async function getTagsContents(payload) {
    console.log("🚀 ~ file tagContents.js:4 ~ getTagsContents ~ payload:", payload)
    const { tagName, page } = payload
    const response = await instance.get(`/tags/tagSearch/${tagName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data)
    // const { data, currentPage, limit, totalCount, totalPages } = response
    // console.group('getTagsContents')
    console.log(response)
    // console.groupEnd('getTagsContents')

    return response
}