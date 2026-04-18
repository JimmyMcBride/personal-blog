import { authorName, description as defaultDescription, title as defaultTitle, url } from "$lib/config"
import { formatTaxonomyLabel } from "$lib/taxonomy"

type SeoPageType = "website" | "article"

interface SeoInput {
	path: string
	title: string
	description: string
	image?: string
	type?: SeoPageType
	publishedTime?: string
	modifiedTime?: string
}

function toIsoDate(date?: string) {
	if (!date) return undefined

	const parsedDate = new Date(date.replaceAll("-", "/"))

	if (Number.isNaN(parsedDate.getTime())) {
		return undefined
	}

	return parsedDate.toISOString()
}

export function toAbsoluteUrl(path: string) {
	return new URL(path, url).toString()
}

export function toAbsoluteImageUrl(image = "/blog-banner.webp") {
	if (image.startsWith("http://") || image.startsWith("https://")) {
		return image
	}

	return toAbsoluteUrl(image)
}

export function formatCategoryLabel(category: string) {
	return formatTaxonomyLabel(category)
}

export function createSeo({
	path,
	title,
	description,
	image,
	type = "website",
	publishedTime,
	modifiedTime,
}: SeoInput) {
	const canonical = toAbsoluteUrl(path)
	const resolvedImage = toAbsoluteImageUrl(image)

	return {
		title,
		description,
		canonical,
		image: resolvedImage,
		type,
		publishedTime: toIsoDate(publishedTime),
		modifiedTime: toIsoDate(modifiedTime),
		twitterCard: "summary_large_image",
	}
}

export function createWebsiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${url}/#website`,
		url,
		name: defaultTitle,
		description: defaultDescription,
		inLanguage: "en-US",
	}
}

export function createBlogPostingJsonLd(post: Post) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${toAbsoluteUrl(`/blog/${post.slug}`)}#article`,
		mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}`),
		headline: post.title,
		description: post.short ?? post.description,
		image: [toAbsoluteImageUrl(post.image)],
		datePublished: toIsoDate(post.date),
		dateModified: toIsoDate(post.updated ?? post.date),
		author: {
			"@type": "Person",
			name: authorName,
			url,
		},
		publisher: {
			"@type": "Person",
			name: authorName,
			url,
		},
		inLanguage: "en-US",
		isAccessibleForFree: true,
		articleSection: post.categories[0],
		keywords: post.categories,
		about: post.categories.map((category) => ({
			"@type": "Thing",
			name: formatCategoryLabel(category),
		})),
	}
}

export function renderJsonLd(data: unknown) {
	return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function renderJsonLdScript(data: unknown) {
	return `<script type="application/ld+json">${renderJsonLd(data)}</script>`
}
