import { json } from "@sveltejs/kit"
import { getPublishedPosts } from "$lib/posts"

export async function GET() {
	const posts = getPublishedPosts()
	return json(posts)
}

export const prerender = true
