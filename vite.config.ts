import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import webExtension from 'vite-plugin-web-extension';
import path from 'path';


export default defineConfig({
	root: 'src',
	publicDir: 'assets',
	plugins: [
		solidPlugin(),
		webExtension({
			manifest: path.resolve(__dirname, 'src/manifest.json'),
			webExtConfig: {
				firefox: 'firefox',
			},
		}),
	],
	build: {
		minify: 'terser',
		outDir: path.resolve(__dirname, 'dist'),
		target: 'esnext',
		emptyOutDir: true,
	},
});
