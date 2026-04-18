import { error } from "@sveltejs/kit"
import type { LoadEvent } from "@sveltejs/kit"
import { getPublishedPosts } from "$lib/posts"
import { getPrimaryTopic, getRelatedPosts } from "$lib/taxonomy"

export const load = async ({ params, fetch }: LoadEvent) => {
	try {
		// Load the mdsvex markdown post (Svelte component)
		const post = await import(`../../../posts/${params.slug}.md`)
		const currentPost = {
			...post.metadata,
			slug: params.slug,
		} as Post

		// Return the markdown component and serializable data
		const posts = getPublishedPosts()
		const primaryTopic = getPrimaryTopic(currentPost)
		const relatedPosts = getRelatedPosts(posts, currentPost)

		return {
			content: post.default, // This is the Svelte component for the blog content
			meta: post.metadata,
			comments: [],
			primaryTopic,
			relatedPosts,
		}
	} catch (e) {
		console.error(e)
		throw error(404, `Could not find ${params.slug}`)
	}
}

export const prerender = true
