import { error } from "@sveltejs/kit"
import type { LoadEvent } from "@sveltejs/kit"
import { getPublishedPosts } from "$lib/posts"
import { getPostsForTopic, getTopic, getTopicLatestDate } from "$lib/taxonomy"

export const load = async ({ params }: LoadEvent) => {
	const topicSlug = params.topic

	if (!topicSlug) {
		throw error(404, "Topic not found")
	}

	const topic = getTopic(topicSlug)

	if (!topic) {
		throw error(404, "Topic not found")
	}

	const posts = getPostsForTopic(getPublishedPosts(), topic.slug)

	return {
		topic,
		latestActivityDate: getTopicLatestDate(posts),
		posts,
	}
}

export const prerender = true
