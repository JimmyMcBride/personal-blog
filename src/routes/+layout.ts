import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ url, fetch }: ServerLoadEvent) {
  let user = null
  if (!import.meta.env.SSR) {
    const res = await fetch("/api/auth")
    const data = await res.json()
    user = data.user
  }
  return {
    url: url.pathname,
    user,
  }
}

export const prerender = true
