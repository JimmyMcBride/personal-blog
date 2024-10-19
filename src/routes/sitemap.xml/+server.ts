import { url } from "$lib/config"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import type { RequestEvent } from "@sveltejs/kit"

export const GET = async ({ fetch }: RequestEvent) => {
	const response = await fetch("/api/posts")
	const posts: Post[] = await response.json()

	const links = posts.map((post: Post) => ({
		url: `/blog/${post.slug}`,
		changefreq: "weekly",
		priority: 0.8,
	}))

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
