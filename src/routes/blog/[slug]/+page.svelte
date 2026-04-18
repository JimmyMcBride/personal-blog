<script lang="ts">
	import { browser } from "$app/environment"
	import { formatDate } from "$lib/utils"
	import { title } from "$lib/config"
	import { createBlogPostingJsonLd, createSeo, renderJsonLdScript } from "$lib/seo"
	import { formatTaxonomyLabel } from "$lib/taxonomy"
	import { page } from "$app/stores"
	import { handleDiscordLogin, handleLogout } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { pb, getAvatarUrl } from "$lib/pocketbase"
	import { Button } from "$lib/components/ui/button"
	import { Badge } from "$lib/components/ui/badge"

	let { data } = $props()

	let slug = $derived($page.params.slug)
	let content = $derived(data.content)
	let meta = $derived(data.meta)
	let seo = $derived(
		createSeo({
			path: `/blog/${slug}`,
			title: meta.title,
			description: meta.short ? meta.short : meta.description,
			image: meta.image,
			type: "article",
			publishedTime: meta.date,
			modifiedTime: meta.updated ? meta.updated : meta.date,
		})
	)
	let blogPostingJsonLd = $derived(
		createBlogPostingJsonLd({
			...meta,
			slug,
		})
	)
	let primaryTopic = $derived(data.primaryTopic)
	let relatedPosts = $derived(data.relatedPosts ?? [])
	let newComment = $state("")
	let comments = $state<unknown[]>([])
	let loadedCommentsFor = $state<string | null>(null)

	$effect(() => {
		comments = data.comments || []
		loadedCommentsFor = null
	})

	$effect(() => {
		if (!browser || !slug || loadedCommentsFor === slug) return

		loadedCommentsFor = slug
		void loadComments(slug)
	})

	async function loadComments(currentSlug: string) {
		try {
			const commentsData = await pb.collection("comments").getList(0, 50, {
				filter: `slug = "${currentSlug}"`,
				sort: "-created",
				expand: "user",
			})

			if (currentSlug === slug) {
				comments = commentsData.items || []
			}
		} catch (e) {
			console.error(e)
		}
	}

	async function addComment() {
		if ($user) {
			try {
				const comment = {
					message: newComment,
					user: $user.id,
					slug: slug,
				}
				const record = await pb.collection("comments").create(comment)
				const expandedComment = await pb.collection("comments").getOne(record.id, {
					expand: "user",
				})
				if (record) {
					comments = [...comments, expandedComment]
					newComment = ""
				} else {
					console.error("Failed to add comment")
				}
			} catch (e) {
				console.error(e)
			}
		}
	}

	function login() {
		sessionStorage.setItem("last_page", `/blog/${slug}`)
		handleDiscordLogin()
	}
</script>

<!-- SEO -->
<svelte:head>
	<title>{seo.title}</title>

	<link rel="canonical" href={seo.canonical} />
	<meta name="description" content={seo.description} />

	<meta property="og:type" content={seo.type} />
	<meta property="og:url" content={seo.canonical} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:card" content={seo.twitterCard} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	{#if seo.publishedTime}
		<meta property="article:published_time" content={seo.publishedTime} />
	{/if}
	{#if seo.modifiedTime}
		<meta property="article:modified_time" content={seo.modifiedTime} />
		<meta name="date" content={seo.modifiedTime} />
	{/if}

	<meta property="og:image" content={seo.image} />
	<meta name="twitter:image:src" content={seo.image} />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
	{@html renderJsonLdScript(blogPostingJsonLd)}
</svelte:head>

<article class="mx-auto mb-16 w-full max-w-6xl p-4">
	<!-- Title -->
	<header class="mx-auto mb-6 w-full max-w-5xl space-y-6">
		<div class="space-y-4 text-left">
			<h1 class="text-left text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
				{meta.title}
			</h1>
		</div>
		<img
			src={meta.image}
			alt={`Cover image for ${meta.title}`}
			class="w-full rounded-md"
			width="1000"
		/>
		<p class="text-right text-sm">
			Published at {formatDate(meta.date)}
			<br />
			Updated at {formatDate(meta.updated ? meta.updated : meta.date)}
		</p>
	</header>

	<!-- Tags -->
	<div class="mx-auto mb-6 flex w-full max-w-5xl flex-wrap gap-4">
		{#if primaryTopic}
			<a href={`/topics/${primaryTopic.slug}`} class="no-underline">
				<Badge>#topic: {primaryTopic.title}</Badge>
			</a>
		{/if}
		{#each meta.categories as category}
			<a href={`/blog/categories/${category}`} class="no-underline">
				<Badge variant="secondary">&num;{category}</Badge>
			</a>
		{/each}
	</div>

	{#if primaryTopic}
		<section class="mx-auto mb-10 w-full max-w-5xl rounded-lg border border-border bg-card p-6">
			<p class="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
				Primary topic
			</p>
			<h2 class="mb-3 text-2xl font-bold">{primaryTopic.title}</h2>
			<p class="mb-4 text-muted-foreground">{primaryTopic.summary}</p>
			<a class="font-semibold text-primary underline-offset-4 hover:underline" href={`/topics/${primaryTopic.slug}`}>
				Explore the {formatTaxonomyLabel(primaryTopic.slug)} hub
			</a>

			{#if relatedPosts.length}
				<div class="mt-6">
					<h3 class="mb-3 text-lg font-semibold">Related posts</h3>
					<ul class="space-y-2">
						{#each relatedPosts as post}
							<li>
								<a class="font-medium text-primary underline-offset-4 hover:underline" href={`/blog/${post.slug}`}>
									{post.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</section>
	{/if}

	<!-- Post -->
	<div class="mx-auto w-full max-w-5xl">
		<div class="markdown prose md:prose-lg lg:prose-xl dark:prose-invert max-w-none">
			{#if content}
				{@const PostContent = content}
				<PostContent />
			{/if}
		</div>
	</div>

	<!-- Comments Section -->
	<section class="comments mx-auto mt-10 w-full max-w-5xl">
		<h2>Comments</h2>

		{#if comments?.length > 0}
			{#each comments as c}
				{@const comment = c as {
					expand?: { user?: { id: string; avatar: string; username: string } }
					created: string
					message: string
				}}
				<div class="grid grid-cols-[auto_1fr] gap-2 mb-4">
					<img
						src={comment.expand?.user
							? getAvatarUrl(comment.expand.user.id, comment.expand.user.avatar)
							: "/me-anime.webp"}
						alt={comment.expand?.user?.username ?? "User"}
						class="w-12 h-12 rounded-full object-cover"
					/>
					<div class="rounded-md bg-muted p-4 rounded-tl-none space-y-2">
						<header class="flex justify-between">
							<small class="font-bold text-lg">{comment.expand?.user?.username}</small>
							<small class="opacity-50">
								{formatDate(comment.created)}
							</small>
						</header>
						<p>{comment.message}</p>
					</div>
				</div>
			{/each}
		{:else}
			<p>No comments yet.</p>
		{/if}

		{#if $user}
			<div>
				<form
					onsubmit={(e) => {
						e.preventDefault()
						addComment()
					}}
					class="mt-4"
				>
					<label class="sr-only" for="comment-message">Write a comment</label>
					<div
						class="grid grid-cols-[1fr_auto] overflow-hidden rounded-md ring-1 ring-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
					>
						<textarea
							id="comment-message"
							bind:value={newComment}
							class="w-full resize-y border-0 bg-transparent px-3 py-2 text-base focus:outline-none"
							name="prompt"
							placeholder="Write a message..."
							rows={1}
						></textarea>
						<Button type="submit" class="rounded-none">Send</Button>
					</div>
				</form>
				<Button variant="destructive" class="mt-8" onclick={handleLogout}>Sign out</Button>
			</div>
		{:else}
			<p>You must be logged in to add a comment.</p>
			<Button onclick={login}>Log in with Discord</Button>
		{/if}
	</section>
</article>
