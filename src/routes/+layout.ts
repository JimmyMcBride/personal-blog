import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ url, fetch }: ServerLoadEvent) {
  const res = await fetch("/api/auth")
  const data = await res.json()
  return {
    url: url.pathname,
    user: data.user,
  }
}

export const prerender = true
