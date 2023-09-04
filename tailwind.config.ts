import { join } from "path"
import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import { myCustomTheme } from "./theme"

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin"

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		// 3. Append the path to the Skeleton package
		join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		forms,
		typography,
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: {
				custom: [myCustomTheme],
			},
		}),
	],
} satisfies Config

export default config
