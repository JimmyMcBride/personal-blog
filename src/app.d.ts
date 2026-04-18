// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Post {
	title: string
	slug: string
	description: string
	short?: string
	image?: string
	date: string
	updated?: string
	categories: string[]
	topics?: string[]
	published: boolean
}

interface BlogComment {
	name: string
	avatar: string
	content: string
	createdAt: string
}
