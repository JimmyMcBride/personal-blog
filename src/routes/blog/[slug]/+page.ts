import { error } from "@sveltejs/kit"
import { pb } from "$lib/pocketbase"
import type { LoadEvent } from "@sveltejs/kit"
import type { ListResult, RecordModel } from "pocketbase"

export const load = async ({ params, fetch }: LoadEvent) => {
  try {
    // Load the mdsvex markdown post (Svelte component)
    const post = await import(`../../../posts/${params.slug}.md`)

    // Fetch Plausible analytics data
    const slug = params.slug

    // Fetch data dynamically when the page is loaded, not during prerendering
    let commentsData: ListResult<RecordModel> | null = null
    let views = 0
    let readers = 0

    if (!import.meta.env.SSR) {
      const res = await fetch(`/api/views/${slug}`)

      const data = await res.json()
      views = data.views
      readers = data.readers

      // Only fetch comments on the client-side after rendering
      commentsData = await pb.collection("comments").getList(0, 50, {
        filter: `slug = "${slug}"`,
        sort: "-created", // Order by newest comments first
        expand: "user",
      })
    }

    // Return the markdown component and serializable data
    return {
      content: post.default, // This is the Svelte component for the blog content
      meta: post.metadata,
      views,
      readers,
      comments: commentsData?.items || [],
    }
  } catch (e) {
    console.error(e)
    throw error(404, `Could not find ${params.slug}`)
  }
}

export const prerender = true
