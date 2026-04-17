# Dependency Update & Migration Plan

**Generated:** March 2026
**Project:** Personal Blog (SvelteKit + PocketBase)
**Package Manager:** Bun

---

## Overview

This project has 4 major migrations required plus several smaller updates. The migrations form a **hard dependency chain** — each must be completed in order before the next can begin.

```
Svelte 4→5  →  SvelteKit 2.x latest  →  Vite 5→8  →  Tailwind 3→4  →  Skeleton v2→v3  →  ESLint 8→10  →  Prettier 2→3  →  Remaining packages
```

---

## Current vs Latest: Full Dependency Table

| Package                            | Current | Latest            | Major Bump | Priority                            |
| ---------------------------------- | ------- | ----------------- | ---------- | ----------------------------------- |
| `svelte`                           | 4.2.7   | **5.54.0**        | Yes        | Critical                            |
| `@sveltejs/vite-plugin-svelte`     | 3.1.2   | **7.0.0**         | Yes        | Critical                            |
| `@sveltejs/kit`                    | 2.0.0   | **2.55.0**        | No         | High (security fix in 2.52.2)       |
| `vite`                             | 5.0.3   | **8.0.0**         | Yes        | High                                |
| `tailwindcss`                      | 3.4.1   | **4.2.1**         | Yes        | High                                |
| `@skeletonlabs/skeleton`           | 2.9.0   | **v3/v4**         | Yes        | High                                |
| `@skeletonlabs/tw-plugin`          | 0.1.0   | _(removed in v3)_ | —          | Remove                              |
| `eslint`                           | 8.57.0  | **10.1.0**        | Yes        | Medium                              |
| `@typescript-eslint/eslint-plugin` | 5.62.0  | **8.57.1**        | Yes        | Medium                              |
| `prettier`                         | 2.8.8   | **3.8.1**         | Yes        | Medium                              |
| `flowbite-svelte`                  | 0.46.23 | **1.31.0**        | Yes        | Medium                              |
| `flowbite-svelte-icons`            | 0.3.6   | **3.1.0**         | Yes        | Medium                              |
| `flowbite`                         | 2.5.2   | **4.0.1**         | Yes        | Medium                              |
| `@tiptap/starter-kit`              | 2.8.0   | **3.20.3**        | Yes        | Medium                              |
| `svelte-tiptap`                    | 1.1.3   | **3.0.1**         | Yes        | Medium (see warning)                |
| `shiki`                            | 1.21.0  | **4.0.2**         | Yes        | Medium                              |
| `tailwind-merge`                   | 1.14.0  | **3.5.0**         | Yes        | Medium                              |
| `uuid`                             | 9.0.1   | **13.0.0**        | Yes        | Low                                 |
| `sitemap`                          | 8.0.0   | **9.0.0**         | Yes        | Low                                 |
| `pocketbase`                       | 0.21.5  | **0.26.8**        | No         | Low                                 |
| `dompurify`                        | 3.1.7   | **3.3.3**         | No         | Low                                 |
| `svelte-check`                     | 4.0.0   | **4.4.5**         | No         | Low                                 |
| `mdsvex`                           | 0.12.3  | **0.12.7**        | No         | Low                                 |
| `typescript`                       | 5.4.2   | **5.9.3**         | No         | Low                                 |
| `@tailwindcss/forms`               | 0.5.7   | **0.5.11**        | No         | Low                                 |
| `@tailwindcss/typography`          | 0.5.10  | **0.5.19**        | No         | Low                                 |
| `postcss`                          | 8.4.35  | 8.x               | No         | Remove (with Tailwind v4)           |
| `autoprefixer`                     | 10.4.20 | 10.x              | No         | Remove (with Tailwind v4)           |
| `rehype-slug`                      | 6.0.0   | **6.0.0**         | No         | Already latest                      |
| `remark-toc`                       | 9.0.0   | **9.0.0**         | No         | Already latest                      |
| `remark-unwrap-images`             | 4.0.0   | _(deprecated)_    | —          | Replace with `rehype-unwrap-images` |

---

## Phase 1 — Svelte 4 → 5

**Effort:** Medium-High | **Risk:** Medium (Svelte 5 runs Svelte 4 syntax; migration is incremental)

### What's Changing

Svelte 5 replaces implicit reactivity with explicit **runes** (`$state`, `$derived`, `$effect`). Existing Svelte 4 component syntax still works in Svelte 5, so you can migrate incrementally or all at once.

### Steps

1. **Update packages:**

   ```bash
   bun add -d svelte@^5 @sveltejs/vite-plugin-svelte@^7
   ```

2. **Run the automated migration CLI** (handles ~80% of renames):

   ```bash
   bunx sv migrate svelte-5
   ```

   This converts:
   - `export let` → `$props()`
   - `let x = ...` reactive declarations → `$state()`
   - `$: derived = ...` → `$derived()`
   - `on:click={...}` → `onclick={...}` etc.

3. **Manual fixes required:**
   - Replace all `createEventDispatcher` usage with callback props
   - Remove all event modifiers (`|preventDefault`, `|stopPropagation`) — call `event.preventDefault()` inside handlers instead
   - Replace `<slot>` with `{@render children()}` and `{#snippet}` blocks
   - Replace `beforeUpdate`/`afterUpdate` with `$effect.pre()`/`$effect()`

4. **Run type check and fix remaining errors:**
   ```bash
   bun run check
   ```

### Breaking Change: Null/Undefined Rendering

`{null}` and `{undefined}` now render as empty strings instead of the literal text `"null"`. Verify any conditional rendering that relied on this behavior.

### Breaking Change: Stricter HTML

Svelte 5 rejects malformed HTML (e.g. `<p><div>...</div></p>`). Run `bun run check` to find these.

---

## Phase 2 — SvelteKit 2.x (Security Update)

**Effort:** Low | **Risk:** Low

### Steps

```bash
bun add -d @sveltejs/kit@latest
```

No breaking changes. This is primarily a security fix — versions before `2.52.2` have a vulnerability (CPU/memory exhaustion via malformed form data) that is patched in later releases.

---

## Phase 3 — Vite 5 → 8

**Effort:** Low-Medium | **Risk:** Medium

### What's Changing

Vite 8 ships with **Rolldown** (Rust-based bundler) replacing Rollup. Builds are significantly faster. Requires **Node.js 20.19+ or 22.12+** — your `nixpacks.toml` already specifies Node.js 22, so you are covered.

### Steps

1. **Update Vite:**

   ```bash
   bun add -d vite@^8
   ```

2. **Verify all Vite plugins are compatible** — check `@sveltejs/vite-plugin-svelte@7` and `@tailwindcss/vite` (added in Phase 4) support Vite 8. Both do as of March 2026.

3. **Review `vite.config.ts`** for any deprecated config options. Clean up the commented-out Firebase env vars while you are there.

---

## Phase 4 — Tailwind CSS 3 → 4

**Effort:** High | **Risk:** Medium-High

### What's Changing

Tailwind v4 is a complete architecture change. Configuration moves from `tailwind.config.ts` (JavaScript) to CSS-first using `@theme {}` directives. The PostCSS plugin approach is replaced by a Vite plugin.

### Steps

1. **Run the official upgrade tool** (handles ~80% automatically):

   ```bash
   bun add -d tailwindcss@^4 @tailwindcss/vite
   bunx @tailwindcss/upgrade
   ```

2. **Update `vite.config.ts`** — add Tailwind Vite plugin:

   ```ts
   import tailwindcss from "@tailwindcss/vite"

   export default defineConfig({
   	plugins: [sveltekit(), tailwindcss()],
   })
   ```

3. **Delete `tailwind.config.ts`** — configuration now lives in CSS.

4. **Update `src/app.pcss`** (or `src/tailwind.pcss`):

   ```css
   /* Replace all @tailwind directives with: */
   @import "tailwindcss";

   /* Plugins (previously in tailwind.config.ts plugins array): */
   @plugin '@tailwindcss/forms';
   @plugin '@tailwindcss/typography';

   /* Custom theme (migrated from tailwind.config.ts theme section): */
   @theme {
   	--font-family-base: "Inter", sans-serif;
   	/* ...other theme values... */
   }
   ```

5. **Update Tailwind plugins:**

   ```bash
   bun add -d @tailwindcss/forms@^0.5.11 @tailwindcss/typography@^0.5.19
   ```

6. **Remove no-longer-needed packages:**

   ```bash
   bun remove autoprefixer postcss
   ```

   Delete `postcss.config.cjs`.

7. **Update `tailwind-merge` to v3** (required for Tailwind v4 class names):

   ```bash
   bun add tailwind-merge@^3
   ```

8. **Verify dark mode** — Tailwind v4 uses `@variant dark` in CSS for dark mode customization. Class-based dark mode (`darkMode: "class"`) still works.

### Files to Delete

- `tailwind.config.ts`
- `postcss.config.cjs`

---

## Phase 5 — Skeleton UI v2 → v3

**Effort:** Very High | **Risk:** High

### What's Changing

Skeleton v3 is a complete ground-up rewrite. It:

- Requires **Svelte 5 and Tailwind v4** (must complete Phases 1 and 4 first)
- Splits into `@skeletonlabs/skeleton` (core/CSS) and `@skeletonlabs/skeleton-svelte` (Svelte components)
- Removes `@skeletonlabs/tw-plugin` entirely
- Rewrites all components using Svelte 5 runes and snippets
- Is now framework-agnostic (also has React variant)

> **Note:** The Skeleton team recommends treating this as a **rewrite rather than a migration** for existing apps, due to the scope of changes.

### Steps

1. **Uninstall old packages:**

   ```bash
   bun remove @skeletonlabs/skeleton @skeletonlabs/tw-plugin
   ```

2. **Install new packages:**

   ```bash
   bun add @skeletonlabs/skeleton @skeletonlabs/skeleton-svelte
   ```

3. **Update CSS imports** in `src/app.pcss`:

   ```css
   @import "tailwindcss";
   @import "@skeletonlabs/skeleton";
   @import "@skeletonlabs/skeleton-svelte";
   @import "@skeletonlabs/skeleton/themes/cerberus"; /* or your chosen theme */
   ```

4. **Delete `theme.ts`** — custom theme configuration now uses CSS variables in your CSS file instead of the Skeleton Tailwind plugin theme builder.

5. **Rewrite all Skeleton component usages.** Components used in this project:
   - `AppShell` → `AppShell` (likely renamed/restructured)
   - `AppBar` → check v3 docs for equivalent
   - `Avatar` → check v3 docs
   - `LightSwitch` → check v3 docs (dark mode toggle)
   - `Toast` / `toastStore` → check v3 docs (likely store-based API changed)

6. **Verify `tailwind.config.ts` references** — the old config referenced Skeleton for `fontFamily` and component class detection. All of this moves to CSS.

7. **Consult the official migration guide:** https://www.skeleton.dev/docs/svelte/get-started/migrate-from-v2

---

## Phase 6 — ESLint 8 → 10

**Effort:** Medium | **Risk:** Low

### What's Changing

ESLint 10 completely removes the old `.eslintrc.*` config format. Your project uses `.eslintrc.cjs` which must be converted to the new **flat config** (`eslint.config.js`).

### Steps

1. **Update packages:**

   ```bash
   bun add -d eslint@^10 typescript-eslint@^8 eslint-plugin-svelte@^3
   bun remove @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

   Note: In ESLint 9+, use the unified `typescript-eslint` package instead of the separate plugin/parser packages.

2. **Generate a flat config from your existing `.eslintrc.cjs`:**

   ```bash
   bunx @eslint/migrate-config .eslintrc.cjs
   ```

   This outputs an `eslint.config.js` as a starting point.

3. **Manually update the generated config** — key differences:
   - `env` property is removed; use `languageOptions.globals` with `globals` package
   - `extends` is replaced by spreading config arrays
   - `plugins` are now objects, not string names

4. **Delete `.eslintrc.cjs`.**

5. **Example flat config structure for this project:**

   ```js
   import svelte from "eslint-plugin-svelte"
   import tseslint from "typescript-eslint"
   import globals from "globals"

   export default tseslint.config(
   	tseslint.configs.recommended,
   	...svelte.configs["flat/recommended"],
   	{
   		languageOptions: {
   			globals: { ...globals.browser, ...globals.node },
   		},
   	},
   	{
   		files: ["*.svelte"],
   		languageOptions: {
   			parserOptions: { parser: tseslint.parser },
   		},
   	},
   	{
   		rules: {
   			"svelte/no-at-html-tags": "off", // preserve your existing rule
   		},
   	}
   )
   ```

---

## Phase 7 — Prettier 2 → 3

**Effort:** Low | **Risk:** Low

### Steps

1. **Update packages:**

   ```bash
   bun add -d prettier@^3 prettier-plugin-svelte@^3
   ```

   Note: `prettier-plugin-svelte@^3` is required for both Prettier 3 and Svelte 5 support.

2. **Remove `--plugin-search-dir` flag** from `package.json` scripts — this flag was removed in Prettier 3:

   ```json
   "format": "prettier --write .",
   "lint": "prettier --check . && eslint ."
   ```

3. **Update `.prettierrc`** — the `plugins` array syntax changed slightly in v3. Verify your config is valid.

---

## Phase 8 — Remaining Package Updates

These can largely be done together after the major migrations above are complete.

### Flowbite Ecosystem

```bash
bun add flowbite@^4 flowbite-svelte@^1 flowbite-svelte-icons@^3
```

**Warning on `flowbite-svelte`:** The stable `1.31.0` has Svelte 5 as a peer dependency and partial support. A ground-up `v2.0.0-next` rewrite for Svelte 5 runes is in progress but still pre-release. After upgrading, audit all Flowbite components for regressions. Consider replacing with Skeleton v3 components or native Tailwind where possible to reduce risk.

### Tiptap (Rich Text Editor)

```bash
bun add @tiptap/starter-kit@^3 svelte-tiptap@^3
```

**Warning on `svelte-tiptap` NodeViews:** If you use custom `NodeView` components in Tiptap (components rendered inside the editor for things like custom blocks), these are **broken in Svelte 5** because Svelte components are no longer classes. Basic editor functionality works fine. Audit your Tiptap usage and consider [`@friendofsvelte/tipex`](https://github.com/friendofsvelte/tipex) as a Svelte 5-native alternative if NodeViews are needed.

### Shiki (Syntax Highlighting)

```bash
bun add shiki@^4
```

Shiki 4 has a cleaned-up API. Your usage in `svelte.config.js` (mdsvex Shiki highlighter) will need to be updated — check the [Shiki v4 migration guide](https://shiki.style/guide/migrate) for the new `createHighlighter` API.

### UUID

```bash
bun add uuid@^13
```

UUID v10+ dropped CommonJS support — it is ESM-only. Your project is already `"type": "module"` so this should be compatible. Also, `@types/uuid` is no longer needed (types are now bundled) — remove it if present:

```bash
bun remove @types/uuid
```

### Replace Deprecated `remark-unwrap-images`

```bash
bun remove remark-unwrap-images
bun add rehype-unwrap-images
```

Update `svelte.config.js`:

```js
// Remove from remarkPlugins:
// remarkUnwrapImages

// Add to rehypePlugins:
import rehypeUnwrapImages from "rehype-unwrap-images"
// ...
rehypePlugins: [rehypeSlug, rehypeUnwrapImages]
```

### Other Updates

```bash
bun add pocketbase@^0.26 dompurify@^3.3 sitemap@^9
bun add -d svelte-check@^4.4 typescript@^5.9 mdsvex@^0.12.7
```

Check the `sitemap@9` changelog for any breaking API changes before upgrading.

---

## Packages to Remove

| Package                   | Reason                                            |
| ------------------------- | ------------------------------------------------- |
| `@skeletonlabs/tw-plugin` | Removed in Skeleton v3                            |
| `autoprefixer`            | Tailwind v4 handles vendor prefixes automatically |
| `postcss`                 | Replaced by `@tailwindcss/vite` plugin            |
| `@types/uuid`             | Types bundled in `uuid@10+`                       |

---

## Recommended Migration Sequence (Summary)

| Phase | Packages                                                     | Effort      | Notes                                             |
| ----- | ------------------------------------------------------------ | ----------- | ------------------------------------------------- |
| 1     | `svelte@5`, `@sveltejs/vite-plugin-svelte@7`                 | Medium-High | Use `bunx sv migrate svelte-5`; incremental OK    |
| 2     | `@sveltejs/kit@latest` (2.55)                                | Low         | Security fix — do this ASAP                       |
| 3     | `vite@8`                                                     | Low-Medium  | Check Rolldown plugin compat                      |
| 4     | `tailwindcss@4`, `@tailwindcss/vite`, remove PostCSS         | High        | Delete `tailwind.config.ts`, `postcss.config.cjs` |
| 5     | `@skeletonlabs/skeleton` v3, `@skeletonlabs/skeleton-svelte` | Very High   | Near-rewrite of all Skeleton components           |
| 6     | `eslint@10`, `typescript-eslint@8`, `eslint-plugin-svelte@3` | Medium      | Migrate to flat config                            |
| 7     | `prettier@3`, `prettier-plugin-svelte@3`                     | Low         | Remove `--plugin-search-dir`                      |
| 8     | All remaining packages                                       | Medium      | See individual notes above                        |

---

## Risk Areas & Warnings

1. **`flowbite-svelte`** — Svelte 5 stable release (`1.31.0`) has partial support; the full runes rewrite (`v2.0.0-next`) is still pre-release. Expect possible component-level bugs after upgrade.

2. **`svelte-tiptap` NodeViews** — Custom NodeView components are broken in Svelte 5. Audit all Tiptap usages before upgrading.

3. **Skeleton v3** — This is essentially a rewrite. Budget significant time for the component API changes and theme system migration. Do not attempt alongside other major migrations.

4. **Shiki v4** — Three major versions jumped (1→4). The `createHighlighter` API changed significantly. The mdsvex Shiki integration will need updating in `svelte.config.js`.

5. **`mdsvex` + Svelte 5** — `mdsvex` is still pre-1.0. The `0.12.7` release appears to address Svelte 5 compatibility but monitor the GitHub issues for any lingering edge cases, particularly around the custom `img.svelte` component used in this project.
