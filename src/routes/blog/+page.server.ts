import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ fetch }: ServerLoadEvent) {
  const response = await fetch("api/posts")
  const posts: Post[] = await response.json()
  return { posts }
}
