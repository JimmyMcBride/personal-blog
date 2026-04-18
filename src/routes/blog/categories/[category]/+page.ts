import type { ServerLoadEvent } from "@sveltejs/kit"
import { error, redirect } from "@sveltejs/kit"
import { normalizeCategorySlug } from "$lib/taxonomy"

export const load = async ({ params, fetch }: ServerLoadEvent) => {
	const { category } = params
	const response = await fetch(`/api/posts`)
	const allPosts = await response.json()

	if (category === undefined) {
		throw error(404, "Category not found")
	}

	const normalizedCategory = normalizeCategorySlug(category)

	if (normalizedCategory !== category) {
		throw redirect(308, `/blog/categories/${normalizedCategory}`)
	}

	const posts = allPosts.filter((post: Post) =>
		post.categories.some((postCategory) => normalizeCategorySlug(postCategory) === normalizedCategory)
	)

	return {
		category: normalizedCategory,
		posts,
	}
}
