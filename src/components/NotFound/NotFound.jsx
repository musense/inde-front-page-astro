import React, { useEffect } from 'react'
import { getInfoBySitemap } from "@assets/js/sitemap";


export default function NotFound({ apiUrl }) {
    const routeMap = new Map([
        ['/c_', '/c/'],
        ['/tag_', '/t/'],
        ['/p_', '/c/{category}/p/'],
    ])
    useEffect(() => {
        const location = window.location
        const href = window.location.href
        const pathname = window.location.pathname
        console.log("🚀 ~ file: notFound.jsx:20 ~ useEffect ~ pathname:", pathname)
        routeMap.forEach((value, key) => {
            console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ key:", key)
            if (pathname.startsWith(key)) {
                const route = value
                console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ route:", route)
                const decodedUrl = decodeURIComponent(href)
                console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ decodedUrl:", decodedUrl)
                const payload = {
                    href: decodedUrl,
                    apiUrl: apiUrl,
                };
                getInfoBySitemap(payload)
                    .then(res => {
                        const { data } = res
                        console.log("🚀 ~ file: notFound.jsx:20 ~ useEffect ~ res:", res)
                        if (res.Type === 'editor') {
                            console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ res.Type:", res.Type)
                            console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ data.categories.name:", data.categories.name)
                            const routeWithCategory = route.replace('{category}', data.categories.name)
                            console.log("🚀 ~ file: notFound.jsx:20 ~ routeMap.forEach ~ routeWithCategory:", routeWithCategory)
                            window.open(`${routeWithCategory}${data._id}`, "_self")
                        } else {
                            window.open(`${route}${data.name}`, "_self")
                        }
                    });
            } else {
                window.open(`/`, "_self")
            }
        })
    }, []);
}
