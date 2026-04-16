import adapter from "@sveltejs/adapter-node"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex, escapeSvelte } from "mdsvex"
import { getSingletonHighlighter } from "shiki"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"

const supportedCodeLanguages = [
	"bash",
	"css",
	"groovy",
	"html",
	"javascript",
	"kotlin",
	"markdown",
	"svelte",
	"text",
	"typescript",
]

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const normalizedLang = lang === "sh" ? "bash" : lang
			const codeLang = supportedCodeLanguages.includes(normalizedLang) ? normalizedLang : "text"
			const highlighter = await getSingletonHighlighter({
				themes: ["one-dark-pro"],
				langs: supportedCodeLanguages,
			})
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang: codeLang, theme: "one-dark-pro" }))
			return `{@html \`${html}\` }`
		},
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug, rehypeUnwrapImages],
}

export default {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
	},
}
