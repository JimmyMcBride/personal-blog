import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ url }: ServerLoadEvent) {
	return {
		url: url.pathname,
	}
}
