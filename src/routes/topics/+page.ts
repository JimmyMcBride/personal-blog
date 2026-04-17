import { getPublishedPosts } from "$lib/posts"
import { getTopicOverviewItems } from "$lib/taxonomy"

export const load = () => {
	return {
		topics: getTopicOverviewItems(getPublishedPosts()),
	}
}

export const prerender = true
