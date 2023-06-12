import { defineConfig } from 'astro/config';
import * as dotenv from 'dotenv'
import react from "@astrojs/react";
import viteCompression from 'vite-plugin-compression';
dotenv.config()

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	root: "./src",
	publicDir: "./public",
	experimental: {
		assets: true
	},
	plugins: [
		viteCompression({
			threshold: 512000 // 對大於 512kb 的文件進行壓縮
		})
	],
	server: {
		port: 4200,
		host: true
	},
	site         : 'https://www.zoonobet.com',
	trailingSlash: 'never',
});