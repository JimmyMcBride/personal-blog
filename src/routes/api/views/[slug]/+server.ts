import { json } from "@sveltejs/kit"
import type { ServerLoadEvent } from "@sveltejs/kit"
import { PLAUSIBLE_API_KEY } from "$env/static/private"

export async function GET({ params }: ServerLoadEvent) {
  const slug = params.slug
  const url = "https://plausible.jimmymcbride.dev/api/v2/query"

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
    },
    body: JSON.stringify({
      site_id: "jimmymcbride.dev",
      metrics: ["pageviews", "visitors"],
      date_range: "all",
      filters: [["contains", "event:page", [`/blog/${slug}`]]],
    }),
  })
  const data = await res.json()

  const views = data.results[0]?.metrics[0] || 0
  const readers = data.results[0]?.metrics[1] || 0

  return json({ views, readers })
}
