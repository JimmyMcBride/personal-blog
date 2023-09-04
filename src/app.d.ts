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
	image?: string
	date: string
	categories: string[]
	published: boolean
}
