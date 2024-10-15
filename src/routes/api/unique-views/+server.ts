import { json } from "@sveltejs/kit"
import type { ServerLoadEvent } from "@sveltejs/kit"
import { v4 as uuidv4 } from "uuid"
import { adminDB } from "$lib/server/admin"

export async function POST({ request, cookies }: ServerLoadEvent) {
  const { slug } = await request.json()

  const expiresIn = 60 * 60 * 24 * 365 * 7 * 1000 // 7 years

  const blogViewDoc = adminDB.collection("blogViews").doc(slug)

  try {
    // Try to fetch the document
    const docSnapshot = await blogViewDoc.get()

    if (!docSnapshot.exists) {
      // The document does not exist, create it
      await blogViewDoc.set({ comments: [] }) // Initialize comments field as an empty array
    }
  } catch (error) {
    console.error("Error:", error)
  }

  const blogViewSnapshot = await blogViewDoc.get()
  const blogViewData = blogViewSnapshot.data()

  // Fetch existing comments from the blog post document
  const comments = blogViewData?.comments ?? [] // Default to an empty array if no comments

  const cookie = cookies.get("__unique_user")
  if (cookie !== undefined) {
    const currentTotalViews = await handleUniqueViews(
      blogViewData?.uniqueViewers,
      blogViewData?.totalViews,
      blogViewDoc,
      cookie
    )
    return json({ totalViews: currentTotalViews, comments })
  }

  const newCookie = uuidv4()
  const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: "/" }
  cookies.set("__unique_user", newCookie, options)
  const currentTotalViews = await handleUniqueViews(
    blogViewData?.uniqueViewers,
    blogViewData?.totalViews,
    blogViewDoc,
    newCookie
  )

  // Return both total views and comments
  return json({
    totalViews: currentTotalViews,
    comments,
  })
}

async function handleUniqueViews(
  uniqueViewers: string[] | undefined,
  totalViews: number | undefined,
  blogViewDoc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  uniqueUserToken: string
) {
  let newTotalViews = totalViews
  if (uniqueViewers === undefined) {
    newTotalViews = 1
    await blogViewDoc.update({
      uniqueViewers: [uniqueUserToken],
      totalViews: newTotalViews,
    })
  } else if (!uniqueViewers.includes(uniqueUserToken)) {
    newTotalViews = totalViews !== undefined ? totalViews + 1 : 1
    await blogViewDoc.update({
      uniqueViewers: [...uniqueViewers, uniqueUserToken],
      totalViews: newTotalViews,
    })
  }
  return newTotalViews
}
