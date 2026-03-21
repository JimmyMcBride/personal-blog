<script lang="ts">
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"
	import { page } from "$app/stores"
	import { handleDiscordLogin, handleLogout } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { pb, getAvatarUrl } from "$lib/pocketbase"

	let { data } = $props()

	let slug = $page.params.slug
	let content = $derived(data.content)
	let meta = $derived(data.meta)
	let views = $derived(data.views)
	let newComment = $state("")
	let comments = $state<unknown[]>([])

	$effect(() => {
		comments = data.comments || []
	})

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

<article class="prose md:prose-lg lg:prose-xl mx-auto dark:prose-invert mb-16 p-4">
	<!-- Title -->
	<hgroup class="flex flex-col items-end">
		<h1 class="">{meta.title}</h1>
		<img src={meta.image} alt="blog banner" class="rounded-md" width="800px" title="Blog banner" />
		<p class="text-end text-sm">
			Published at {formatDate(meta.date)}
			<br />
			Total Views:
			{#if views !== undefined}
				{views}
			{/if}
		</p>
	</hgroup>

	<!-- Tags -->
	<div class="flex flex-wrap gap-4 mb-6">
		{#each meta.categories as category}
			<a href={`/blog/categories/${category}`} class="chip preset-filled-secondary-500 no-underline"
				>&num;{category}</a
			>
		{/each}
	</div>

	<!-- Post -->
	<div class="flex flex-col items-center markdown">
		{#if content}
			{@const PostContent = content}
			<PostContent />
		{/if}
	</div>

	<!-- Comments Section -->
	<section class="comments mt-10">
		<h2>Comments</h2>

		{#if comments?.length > 0}
			{#each comments as c}
				{@const comment = c as { expand?: { user?: { id: string; avatar: string; username: string } }; created: string; message: string }}
				<div class="grid grid-cols-[auto_1fr] gap-2 mb-4">
					<img
						src={comment.expand?.user ? getAvatarUrl(comment.expand.user.id, comment.expand.user.avatar) : "/me-anime.webp"}
						alt={comment.expand?.user?.username ?? "User"}
						class="w-12 h-12 rounded-full object-cover"
					/>
					<div class="card p-4 preset-tonal rounded-tl-none space-y-2">
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
				<form onsubmit={(e) => { e.preventDefault(); addComment() }} class="mt-4">
					<div class="input-group grid-cols-[auto_1fr_auto] rounded-[--radius-container]">
						<button type="button" class="ig-cell">+</button>
						<textarea
							bind:value={newComment}
							class="ig-input"
							name="prompt"
							id="prompt"
							placeholder="Write a message..."
							rows={1}
						></textarea>
						<button type="submit" class="btn preset-filled-primary-500">Send</button>
					</div>
				</form>
				<button class="btn preset-filled-error-500 mt-8" onclick={handleLogout}>Sign out</button>
			</div>
		{:else}
			<p>You must be logged in to add a comment.</p>
			<button class="btn preset-filled-primary-500" onclick={login}>Log in with Discord</button>
		{/if}
	</section>
</article>
