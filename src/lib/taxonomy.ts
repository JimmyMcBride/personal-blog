export interface TopicDefinition {
	slug: string
	title: string
	description: string
	summary: string
	focusAreas: string[]
}

export const categoryAliases: Record<string, string> = {
	"careerdevelopment": "career-development",
	"texutal-healing": "textual-healing",
	"tutoiral": "tutorial",
}

const topics: TopicDefinition[] = [
	{
		slug: "bash",
		title: "Bash and Shell Automation",
		description:
			"Command-line tutorials, shell workflows, text-processing tools, and practical Bash automation for everyday developer work.",
		summary:
			"Learn the shell through real commands, scripts, and text-manipulation workflows that make terminal work faster and more useful.",
		focusAreas: ["Shell basics", "Text processing", "Bash scripting", "Git automation"],
	},
	{
		slug: "linux",
		title: "Linux and Systems",
		description:
			"Linux setup, Arch installation, systems thinking, and practical guidance for working comfortably on developer machines.",
		summary:
			"Explore Linux from both the practical and opinionated sides, from installation guides to day-to-day systems work.",
		focusAreas: ["Arch Linux", "System setup", "Developer workflow", "Open systems"],
	},
	{
		slug: "sveltekit-blogging",
		title: "SvelteKit and Web Publishing",
		description:
			"Posts about building developer blogs, shipping content sites, and improving publishing infrastructure with SvelteKit and search fundamentals.",
		summary:
			"Follow the architectural side of running a technical blog, from SvelteKit implementation to publishing and SEO mechanics.",
		focusAreas: ["SvelteKit", "Blog architecture", "Publishing workflow", "SEO basics"],
	},
	{
		slug: "self-hosting",
		title: "Self-Hosting and Security",
		description:
			"Open-source hosting, operations, analytics ownership, and the security lessons that come with running your own stack.",
		summary:
			"Learn from first-hand self-hosting decisions, platform choices, and security failures that turned into durable operating rules.",
		focusAreas: ["Coolify", "Plausible", "Firewalls", "Operational tradeoffs"],
	},
	{
		slug: "ai",
		title: "AI for Developers",
		description:
			"Practical writing, coding, and tooling workflows for using AI without flattening judgment, authenticity, or source quality.",
		summary:
			"Use AI as a tool, not a replacement, with patterns grounded in real developer and creator workflows.",
		focusAreas: ["AI writing workflows", "AI coding", "Open-source AI tooling", "Authenticity"],
	},
	{
		slug: "career",
		title: "Developer Growth and Project Planning",
		description:
			"Advice for learning, planning, and shipping as a developer without getting trapped by hype, tutorials, or weak project structure.",
		summary:
			"Build stronger judgment around learning, planning, and choosing what to work on so your projects actually compound.",
		focusAreas: ["Learning strategy", "Project planning", "Career judgment", "Tool choices"],
	},
	{
		slug: "android",
		title: "Android and Jetpack Compose",
		description:
			"Android tutorials focused on Jetpack Compose, Material 3, and animation patterns for building polished mobile UI.",
		summary:
			"Browse Android implementation notes and Compose tutorials that emphasize practical UI patterns and shipping details.",
		focusAreas: ["Jetpack Compose", "Material 3", "Animation", "Android UI"],
	},
]

const topicMap = new Map(topics.map((topic) => [topic.slug, topic]))

export function formatTaxonomyLabel(slug: string) {
	return slug
		.split("-")
		.filter(Boolean)
		.map((part) => part[0]?.toUpperCase() + part.slice(1))
		.join(" ")
}

export function normalizeCategorySlug(category: string) {
	return categoryAliases[category] ?? category
}

export function normalizeCategoryList(categories: string[]) {
	return [...new Set(categories.map(normalizeCategorySlug))]
}

export function getAllTopics() {
	return topics
}

export function getTopic(slug: string) {
	return topicMap.get(slug)
}

export function getPrimaryTopic(post: Post) {
	const slug = post.topics?.[0]
	return slug ? getTopic(slug) ?? null : null
}

export function getPostsForTopic(posts: Post[], topicSlug: string) {
	return posts.filter((post) => post.topics?.includes(topicSlug))
}

export function getRelatedPosts(posts: Post[], currentPost: Post, limit = 3) {
	const primaryTopic = currentPost.topics?.[0]

	if (!primaryTopic) {
		return []
	}

	return posts
		.filter((post) => post.slug !== currentPost.slug && post.topics?.includes(primaryTopic))
		.slice(0, limit)
}
