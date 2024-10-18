import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ url, fetch }: ServerLoadEvent) {
  let data = null
  if (!import.meta.env.SSR) {
    const res = await fetch("/api/auth")
    data = await res.json()
  }
  return {
    url: url.pathname,
    user: data.user,
  }
}

export const prerender = true
