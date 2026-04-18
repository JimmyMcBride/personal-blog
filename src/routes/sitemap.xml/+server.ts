import { url } from "$lib/config"
import { getMostRecentPostDate, getPublishedPosts, getUniqueCategories } from "$lib/posts"
import { getAllTopics } from "$lib/taxonomy"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import type { RequestEvent } from "@sveltejs/kit"

export const GET = async (_event: RequestEvent) => {
	const posts = getPublishedPosts()
	const categories = getUniqueCategories(posts)
	const topics = getAllTopics()
	const lastmod = getMostRecentPostDate(posts)
	const coreRoutes = ["/", "/blog", "/topics"]
	const categoryRoutes = categories.map((category) => `/blog/categories/${category}`)
	const topicRoutes = topics.map((topic) => `/topics/${topic.slug}`)

	const links = [
		...coreRoutes.map((route) => ({
			url: route,
			lastmod,
		})),
		...topicRoutes.map((route) => ({
			url: route,
			lastmod,
		})),
		...categoryRoutes.map((route) => ({
			url: route,
			lastmod,
		})),
		...posts.map((post) => ({
			url: `/blog/${post.slug}`,
			lastmod: post.updated ?? post.date,
		})),
	]

	const stream = new SitemapStream({ hostname: url })

	return new Response(
		await streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString()),
		{
			headers: {
				"Content-Type": "application/xml",
			},
		}
	)
}

export const prerender = true
