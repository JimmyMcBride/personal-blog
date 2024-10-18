---
title: "Build The Perfect Tech Blog With SvelteKit"
description: "In this blog, we dive into building a modern blog platform using SvelteKit, Tailwind CSS, and Shiki for syntax highlighting. We’ll cover everything from setting up your project, working with markdown using mdsvex, to implementing SEO and prerendering for maximum performance. By the end, you'll have a fast, scalable blog ready to handle beautiful code snippets and more!"
date: "2024-10-1"
updated: "2024-10-1"
image: /sveltekit-blog-banner.webp
categories:
  - svelte
  - sveltekit
  - tutorial
published: true
---

In this tutorial, we’ll build a fully-functional, SEO-friendly blog using **SvelteKit**, **Tailwind CSS**, and **Shiki** for beautiful syntax highlighting. We’ll also use **mdsvex** for markdown support, **remark-unwrap-images** and **remark-toc** for handling images and generating table of contents, and **rehype-slug** for clean URL slugs.

By the end of this tutorial, you’ll have a responsive blog with markdown support, code highlighting, and metadata display. Let’s dive in step-by-step!

---

### **Step 1: Setting Up SvelteKit and Tailwind CSS**

1.1 **Install SvelteKit**

To get started, we first need to set up a SvelteKit project. Run the following commands to initialize a new project:

```bash
npm create svelte@latest my-blog
cd my-blog
npm install
```

1.2 **Install Tailwind CSS**

Next, let’s integrate **Tailwind CSS** for styling. Tailwind is perfect for building responsive and aesthetically pleasing layouts for blogs.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init tailwind.config.cjs -p
```

Update your `tailwind.config.cjs` file to point to the content paths for Tailwind to scan for utility classes:

```javascript
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")], // Add typography support for better blog post styling
}
```

In your `src/app.css`, import Tailwind’s base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then let's update our `src/routes/+page.svelte`:

```svelte
<h1>Welcome to My SvelteKit Blog!</h1>
<a class="text-blue-500" href="/blog">View my blogs!</a>
```

Finally, include this CSS file in your `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
	import "../app.css"
</script>

<main class="container mx-auto h-full">
	<slot />
</main>
```

Now, you’ve got Tailwind ready for responsive styling!

---

### **Step 2: Setting Up Markdown Parsing with mdsvex and Shiki**

We’ll use **mdsvex** to parse markdown files and **Shiki** for beautiful syntax highlighting.

2.1 **Install Required Dependencies**

Install all necessary packages for markdown parsing and syntax highlighting:

```bash
npm install mdsvex shiki remark-unwrap-images remark-toc rehype-slug
```

2.2 **Configure mdsvex and SvelteKit**

Here’s the full `svelte.config.js` setup to enable **mdsvex**, **Shiki**, and plugins like **remark-unwrap-images** and **remark-toc**.

```javascript
import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex, escapeSvelte } from "mdsvex"
import { bundledLanguages, createHighlighter } from "shiki"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await createHighlighter({
				themes: ["one-dark-pro"],
				// this loads ALL languages. Will get better preformance by only calling what you need. Example: ["css", "javascript"]
				langs: Object.keys(bundledLanguages),
			})
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }))
			return `{@html \`${html}\` }`
		},
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
}

export default {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
	},
}
```

This setup enables markdown (`.md`) support and syntax highlighting with the **One Dark Pro** theme from Shiki.

---

### **Step 3: Creating Blog Posts in Markdown**

Each blog post is written as a markdown file in the `src/posts` directory. Here's how a typical post might look:

#### Example Post: `src/posts/first-post.md`

```markdown
---
title: "First Post"
description: "This is my first post!"
date: "2024-09-24"
image: /first-post-banner.webp
categories:
  - blog
  - tutorial
published: true
---

This is my first post!

## Let's get started

Lorem ipsum dolor sit amet...
```

This metadata in the frontmatter helps populate information like the title, description, date, and categories for each post. **Important**, to make sure images are working, please add an image in your `/static` folder named `first-post-banner.webp` so you can verify it works and nothing breaks.

---

### **Step 4: Fetching and Displaying Blog Posts**

We’ll now create an API route to fetch blog posts and display them in a list. But before we move on, let's add a type for our `Post` to the `app.d.ts` for anyone following along in typescript:

```typescript
// ...
interface Post {
	title: string
	slug: string
	description: string
	image?: string
	date: string
	categories: string[]
	published: boolean
}
```

4.1 **Fetching Blog Posts**

Create a server route `src/routes/api/posts/+server.ts` to load the markdown files:

```typescript
import { json } from "@sveltejs/kit"

async function getPosts() {
	let posts: Post[] = []

	const paths = import.meta.glob("/src/posts/*.md", { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split("/").at(-1)?.replace(".md", "")

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">
			const post = { ...metadata, slug } satisfies Post
			if (post.published) {
				posts.push(post)
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}

export const prerender = true
```

This function grabs all markdown files from the `src/posts` directory, extracts metadata, and returns an array of posts.

### Why We're Using `export const prerender = true`

So you might be wondering, "What's up with the `export const prerender = true` in the blog post API route?" Well, here’s the deal—**prerendering** is one of the key benefits of using **SvelteKit**. By setting `prerender = true`, we're telling SvelteKit to generate the HTML for this page at _build time_ rather than _run time_.

This has several major benefits for our blog:

1. **Improved Performance**: Since the HTML is generated ahead of time, when users hit our blog, they’re getting static files served right away instead of waiting for the server to dynamically build the page. This results in **faster load times** and a **smoother user experience**.
2. **Better SEO**: Prerendering also makes the blog more **search engine friendly**. Search engines like Google can easily crawl static pages, ensuring that all the important metadata (like blog titles, descriptions, etc.) is captured and ranked.

3. **Reduced Server Load**: Because the pages are prebuilt, there's no need to hit the server each time someone visits a blog post. This **reduces the load** on your server, saving you bandwidth and making your site more scalable—especially useful if your blog goes viral. 🙌

In short, prerendering helps make your blog faster, more efficient, and more SEO-friendly—exactly what you want when you're building a modern blog platform.

So, if you're curious about how to squeeze the most out of your blog, prerendering is one way to do it!

4.2 **Displaying Posts in a Blog Page**

Next, let’s build a page that lists all the blog posts. Create `src/routes/blog/+page.server.ts` to load posts:

```typescript
import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ fetch }: ServerLoadEvent) {
	const response = await fetch("/api/posts")
	const posts: Post[] = await response.json()
	return { posts }
}
```

4.3 **Building the Blog Page Layout**

We’ll display each blog post using a custom **BlogCard** component. Let's create `src/lib/components/BlogCard.svelte`:

```svelte
<script lang="ts">
	import { formatDate } from "$lib/utils.js"
	import { title, description, url } from "$lib/config"

	export let post
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content="/blog-banner.webp" />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/blog-banner.webp" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

{#key post.slug}
	<a class="card card-hover overflow-hidden w-full max-w-4xl mt-4 mx-4" href={`/blog/${post.slug}`}>
		<header class="mb-4">
			{#if post.image}
				<img src={post.image} alt="blog banner" />
			{/if}
		</header>

		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{post.title}</h3>
			<article>
				<p>
					{post.description}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-bold" data-toc-ignore>By Jimmy McBride</h6>
				<small>On {formatDate(post.date)}</small>
			</div>
		</footer>
	</a>
{/key}
```

4.4 **Adding Format Date Util And Metadata Config**

For our `formatDate` util we'll add `src/lib/utils.ts`:

```typescript
type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]

export function formatDate(date: string, dateStyle: DateStyle = "medium", locales = "en") {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll("-", "/"))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}
```

Finally, lets add our config file for some basic metadata information `src/lib/config.ts`:

```typescript
import { dev } from "$app/environment"
export const title = "Your Website's Title"
export const description = "A description of your website."
export const url = dev ? "http://localhost:5173" : "https://yourproductionwebsite.com"
```

4.5 **Using The BlogCard**

Now we can use that component for our blog page `src/routes/blog/+page.svelte`:

```svelte
<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	export let data
</script>

<section class="mb-16">
	<ul class="flex flex-col items-center">
		{#each data.posts as post}
			<BlogCard {post} />
		{/each}
	</ul>
</section>
```

Now we should be about to a list of all our blogs!

---

### **Step 5: Displaying Individual Blog Posts**

5.1 **Fetching a Single Post by Slug**

We need to create a `[slug]` route to display individual blog posts. Create the file `src/routes/blog/[slug]/+page.ts`:

```typescript
import { error } from "@sveltejs/kit"
import type { ServerLoadEvent } from "@sveltejs/kit"

export const load = async ({ params }: ServerLoadEvent) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`)

		return {
			content: post.default,
			meta: post.metadata,
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}
```

5.2 **Rendering the Blog Post**

Finally, here’s how we render the full post content in `+page.svelte`:

```svelte
<script lang="ts">
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"

	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}${data.url}`} />
	<meta name="description" content={data.meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}${data.url}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />

	<meta name="twitter:site" content="@YouTwitterHandle" />
	<meta name="twitter:creator" content="@YouTwitterHandle" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<article class="prose mb-16 mx-auto">
	<!-- Title -->
	<hgroup class="flex flex-col items-center">
		<h1 class="">{data.meta.title}</h1>
		<img src={data.meta.image} alt="blog banner" class="rounded-md" />
		<p class="text-end text-sm">
			Published at {formatDate(data.meta.date)}
		</p>
	</hgroup>

	<!-- Tags -->
	<div class="flex flex-wrap gap-4 mb-6">
		{#each data.meta.categories as category}
			<a href={`/blog/categories/${category}`} class="chip variant-filled-secondary no-underline"
				>&num;{category}</a
			>
		{/each}
	</div>

	<!-- Post -->
	<svelte:component this={data.content} />
</article>
```

---

### **Conclusion**

And there you have it! A fully functional, SEO-optimized blog built with **SvelteKit**, **Tailwind CSS**, **mdsvex**, and **Shiki**. You now have the tools to write markdown-based posts with automatic syntax highlighting, responsive designs, and metadata for improved search engine performance. Whether you're sharing tutorials, documenting projects, or blogging about your passion, this setup has you covered for a modern web experience.

If you're as excited about creating awesome content as I am and want to hang out with other like-minded developers, feel free to **join us over in The Developers Lounge**. We’ve got a great community of coders who love to share, tinker, and help each other out. Hope to see you there! [Discord Link](https://discord.gg/4PCy4Bz).
