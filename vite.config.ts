import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [sveltekit()],
	// define: {
	// 	"process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
	// 	"process.env.FIREBASE_CLIENT_EMAIL": JSON.stringify(process.env.FIREBASE_CLIENT_EMAIL),
	// 	"process.env.FIREBASE_PRIVATE_KEY": JSON.stringify(process.env.FIREBASE_PRIVATE_KEY),
	// 	"process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
	// },
})
