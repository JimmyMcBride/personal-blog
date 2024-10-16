import PocketBase from "pocketbase"

const pocketbaseUrl = "https://pocketbase.jimmymcbride.dev"

export const pb = new PocketBase(pocketbaseUrl)

export const handleLogout = () => {
  console.log("Cleared")
  pb.authStore.clear()
}

export const handleDiscordLogin = async () => {
  // Fetch the available auth methods, including Discord
  const authMethods = await pb.collection("users").listAuthMethods()

  // Find Discord as the auth provider
  const discordProvider = authMethods.authProviders.find((p) => p.name === "discord")

  if (discordProvider) {
    // Save codeVerifier in sessionStorage
    sessionStorage.setItem("discord_codeVerifier", discordProvider.codeVerifier)

    // Redirect the user to Discord's OAuth login page
    console.log(`discord auth url: ${discordProvider.authUrl}`)
    window.location.href = discordProvider.authUrl
  } else {
    console.error("Discord auth provider not found")
  }
}

export const getAvatarUrl = (userId: string, userAvatar: string): string => {
  return `${pocketbaseUrl}/api/files/_pb_users_auth_/${userId}/${userAvatar}`
}
