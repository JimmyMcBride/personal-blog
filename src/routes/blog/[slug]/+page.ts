import { error } from "@sveltejs/kit"
import type { LoadEvent } from "@sveltejs/kit"

export const load = async ({ params, fetch }: LoadEvent) => {
	try {
		// Load the mdsvex markdown post (Svelte component)
		const post = await import(`../../../posts/${params.slug}.md`)

		// Fetch Plausible analytics data
		const slug = params.slug

		// Fetch dynamic analytics client-side through the route-scoped fetch.
		let views = 0
		let readers = 0

		if (!import.meta.env.SSR) {
			const res = await fetch(`/api/views/${slug}`)

			const data = await res.json()
			views = data.views
			readers = data.readers

		}

		// Return the markdown component and serializable data
		return {
			content: post.default, // This is the Svelte component for the blog content
			meta: post.metadata,
			views,
			readers,
			comments: [],
		}
	} catch (e) {
		console.error(e)
		throw error(404, `Could not find ${params.slug}`)
	}
}

export const prerender = true
