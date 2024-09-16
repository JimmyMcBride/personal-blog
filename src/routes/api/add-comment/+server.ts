import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { adminDB } from "$lib/server/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST({ request }: RequestEvent) {
	const { slug, comment } = await request.json();

	if (!slug || !comment) {
		return json({ error: "Invalid request" }, { status: 400 });
	}

	const blogViewDoc = adminDB.collection("blogViews").doc(slug);

	try {
		// Add the comment to the blog post document
		await blogViewDoc.update({
			comments: FieldValue.arrayUnion(comment),
		});
		return json({ message: "Comment added successfully" });
	} catch (error) {
		console.error("Error adding comment:", error);
		return json({ error: "Failed to add comment" }, { status: 500 });
	}
}