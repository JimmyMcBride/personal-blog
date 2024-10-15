import { error } from "@sveltejs/kit"
import { pb } from "$lib/pocketbase"
import type { LoadEvent } from "@sveltejs/kit"

export const load = async ({ params, fetch }: LoadEvent) => {
  try {
    // Load the mdsvex markdown post (Svelte component)
    const post = await import(`../../../posts/${params.slug}.md`)

    // Fetch Plausible analytics data
    const slug = params.slug

    const res = await fetch(`/api/views/${slug}`)

    const data = await res.json()
    const views = data.views
    const readers = data.readers

    const commentsData = await pb.collection("comments").getList(0, 50, {
      filter: `slug = "${slug}"`,
      sort: "-created", // Order by newest comments first
      expand: "user",
    })

    // Return the markdown component and serializable data
    return {
      content: post.default, // This is the Svelte component for the blog content
      meta: post.metadata,
      views,
      readers,
      comments: commentsData.items,
    }
  } catch (e) {
    console.error(e)
    throw error(404, `Could not find ${params.slug}`)
  }
}
