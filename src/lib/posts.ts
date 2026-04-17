function sortPostsByDate(posts: Post[]) {
	return posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)
}

export function getPublishedPosts() {
	const posts: Post[] = []
	const paths = import.meta.glob("/src/posts/*.md", { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split("/").at(-1)?.replace(".md", "")

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">
			const post = { ...metadata, slug } satisfies Post

			if (post.published) {
				posts.push(post)
			}
		}
	}

	return sortPostsByDate(posts)
}

export function getUniqueCategories(posts = getPublishedPosts()) {
	return [...new Set(posts.flatMap((post) => post.categories))].sort((first, second) =>
		first.localeCompare(second)
	)
}

export function getMostRecentPostDate(posts = getPublishedPosts()) {
	return posts[0]?.updated ?? posts[0]?.date ?? new Date().toISOString().slice(0, 10)
}
