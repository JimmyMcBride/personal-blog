import type { ServerLoadEvent } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"

export const load = async ({ params, fetch }: ServerLoadEvent) => {
	const { category } = params
	const response = await fetch(`/api/posts`)
	const allPosts = await response.json()

	if (category === undefined) {
		throw error(404, "Category not found")
	}

	const posts = allPosts.filter((post: Post) => post.categories.includes(category))

	return {
		category,
		posts,
	}
}
