<script lang="ts">
	import { onMount } from "svelte"
	import { pb } from "$lib/pocketbase"
	import { goto } from "$app/navigation"
	import { user } from "$lib/stores/user"
	import { dev } from "$app/environment"

	// Function to fetch Discord user data
	const fetchDiscordUserData = async (accessToken: string) => {
		const response = await fetch("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			throw new Error("Failed to fetch Discord user data")
		}

		const discordUser = await response.json()

		return discordUser
	}

	// Function to download the avatar from Discord as a file
	const downloadAvatar = async (avatarUrl: string) => {
		const response = await fetch(avatarUrl)
		const blob = await response.blob()

		// Create a file from the blob
		return new File([blob], "avatar.png", { type: "image/png" })
	}

	// Function to upload the avatar to PocketBase
	const uploadAvatarAndName = async (userId: string, avatarFile: File, name: string) => {
		console.log(`userId: ${userId}, avatarFile: ${avatarFile}, name: ${name}`)
		const formData = new FormData()
		formData.append("avatar", avatarFile)
		formData.append("name", name)

		// Update the user record with the uploaded avatar
		await pb.collection("users").update(userId, formData)
	}

	onMount(async () => {
		try {
			const params = new URLSearchParams(window.location.search)
			const code = params.get("code") // Extract the authorization code from the URL
			const codeVerifier = sessionStorage.getItem("discord_codeVerifier") // Retrieve the codeVerifier saved earlier
			const redirectUri = `${window.location.origin}/auth/callback` // Ensure the same redirect URI is used

			if (!code || !codeVerifier) {
				throw new Error("Authorization code or code verifier missing")
			}

			// Use PocketBase's authWithOAuth2Code to complete the login
			const authData = await pb
				.collection("users")
				.authWithOAuth2Code("discord", code, codeVerifier, redirectUri)
			console.log("auth data:")
			console.dir(authData)

			user.set(pb.authStore.model)
			console.log("user set:")
			console.dir(pb.authStore.model)

			document.cookie = pb.authStore.exportToCookie({
				httpOnly: false,
				secure: !dev,
				sameSite: false,
				credentials: "include",
			})

			// Remove the codeVerifier
			sessionStorage.removeItem("discord_codeVerifier")

			// Only upload the avatar if the user is new
			if (authData.meta.isNew) {
				// Fetch user data from Discord using the access token
				const discordUser = await fetchDiscordUserData(authData.meta.accessToken)

				// Construct the avatar URL
				const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`

				// Download the avatar as a file
				const avatarFile = await downloadAvatar(avatarUrl)

				// Upload the avatar to PocketBase
				await uploadAvatarAndName(authData.record.id, avatarFile, authData.record.globalName)
			}

			// On success, redirect to the homepage or any desired page
			const lastPage = sessionStorage.getItem("last_page")
			goto(lastPage)
			sessionStorage.removeItem("last_page")
		} catch (error) {
			// Remove the codeVerifier
			sessionStorage.removeItem("discord_codeVerifier")

			console.error("OAuth authentication failed:", error)
			// Handle errors, redirect to login page
			goto("/")
		}
	})
</script>

<p>Authenticating... Please wait.</p>
