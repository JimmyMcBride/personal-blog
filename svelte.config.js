import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex, escapeSvelte } from "mdsvex"
import { bundledLanguages, getSingletonHighlighter } from "shiki"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await getSingletonHighlighter({
				themes: ["one-dark-pro"],
				langs: Object.keys(bundledLanguages),
			})
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }))
			return `{@html \`${html}\` }`
		},
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
}

export default {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
	},
}
