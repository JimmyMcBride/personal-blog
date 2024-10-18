import { pb } from "$lib/pocketbase"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ request }) => {
  try {
    // Load authStore from cookies on the server
    pb.authStore.loadFromCookie(request.headers.get("cookie") || "")

    // Get the authenticated user
    const user = pb.authStore.isValid ? pb.authStore.model : null

    console.log("user:")
    console.dir(user)

    return json({ user })
  } catch (err) {
    // In case of cookie tampering or invalid session
    console.error("Error loading user from cookie:", err)

    // Return null user if there's an error
    return json({ user: null }, { status: 401 }) // Return 401 Unauthorized
  }
}
