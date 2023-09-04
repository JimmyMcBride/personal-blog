import type { RequestHandler } from "@sveltejs/kit"
import { MAILCHIMP_API_KEY } from "$env/static/private"
import { error, json } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request, fetch }) => {
	const { email } = await request.json()

	const apiKey = MAILCHIMP_API_KEY
	const listId = "13b0a8a3b2"
	const serverPrefix = apiKey.split("-")[1] // The API key contains the server prefix at the end after a '-' character
	const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`

	const user = {
		email_address: email,
		status: "subscribed",
		tags: ["Official Blog"],
	}

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify(user),
	})

	const data = await response.json()

	if (response.ok) {
		return json({ message: "Successfully subscribed!" })
	} else {
		throw error(response.status, data)
	}
}
