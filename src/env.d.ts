/// <reference path=".astro/types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />


interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_TITLE: string
    readonly VITE_DESCRIPTION: string
    readonly VITE_KEYWORDS: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}