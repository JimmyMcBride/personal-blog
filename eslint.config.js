import js from "@eslint/js"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettier from "eslint-config-prettier"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import svelteParser from "svelte-eslint-parser"

export default [
	js.configs.recommended,
	prettier,
	{
		plugins: { "@typescript-eslint": ts },
		languageOptions: {
			parser: tsParser,
			globals: { ...globals.browser, ...globals.node, ...globals.es2020 },
		},
		rules: {
			...ts.configs.recommended.rules,
		},
	},
	...svelte.configs["flat/recommended"],
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tsParser },
		},
		rules: {
			"svelte/no-at-html-tags": "off",
		},
	},
	{
		ignores: [".svelte-kit/**", "build/**", "dist/**", "node_modules/**"],
	},
]
