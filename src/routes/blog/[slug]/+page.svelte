<script lang="ts">
	import { browser } from "$app/environment"
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"
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
	let views = $derived(data.views)
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
	<title>{meta.title}</title>

	<link rel="canonical" href={`${url}${url}`} />
	<meta name="description" content={meta.short ? meta.short : meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}${url}`} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.short ? meta.short : meta.description} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.short ? meta.short : meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta property="article:published_time" content={meta.updated} />
	<meta property="article:modified_time" content={meta.updated} />
	<meta name="date" content={meta.updated} />

	<meta property="og:image" content={meta.image} />
	<meta name="twitter:image:src" content={meta.image} />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
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
			Total Views:
			{#if views !== undefined}
				{views}
			{/if}
		</p>
	</header>

	<!-- Tags -->
	<div class="mx-auto mb-6 flex w-full max-w-5xl flex-wrap gap-4">
		{#each meta.categories as category}
			<a href={`/blog/categories/${category}`} class="no-underline">
				<Badge variant="secondary">&num;{category}</Badge>
			</a>
		{/each}
	</div>

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
