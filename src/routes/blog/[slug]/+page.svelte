<script lang="ts" defer>
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"
	import { page } from "$app/stores"
	import { handleDiscordLogin, handleLogout } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { Avatar } from "@skeletonlabs/skeleton"
	import { pb, getAvatarUrl } from "$lib/pocketbase"

	let slug = $page.params.slug
	export let data
	let { content, meta, views } = data
	let newComment = ""
	let comments = data.comments || []

	async function addComment() {
		if ($user) {
			console.log("user true")
			try {
				const comment = {
					message: newComment,
					user: $user.id,
					slug: slug,
				}
				const record = await pb.collection("comments").create(comment)
				console.dir(record)
				if (record) {
					comments = [...comments, record]
					newComment = "" // Clear input
				} else {
					console.error("Failed to add comment")
				}
			} catch (e) {
				console.error(e)
			}
		} else {
			console.log("user false")
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
			<a href={`/blog/categories/${category}`} class="chip variant-filled-secondary no-underline"
				>&num;{category}</a
			>
		{/each}
	</div>

	<!-- Post -->
	<svelte:component this={content} />

	<!-- Comments Section -->
	<section class="comments mt-10">
		<h2>Comments</h2>

		{#if comments?.length > 0}
			{#each comments as comment}
				<div class="grid grid-cols-[auto_1fr] gap-2 mb-4">
					<Avatar
						src={getAvatarUrl(comment.expand.user.id, comment.expand.user.avatar)}
						width="w-12"
						rounded="rounded-full"
					/>
					<div class="card p-4 variant-soft rounded-tl-none space-y-2">
						<header class="flex justify-between">
							<small class="font-bold text-lg">{comment.expand.user.username}</small>
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
				<form on:submit|preventDefault={addComment} class="mt-4">
					<div
						class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
					>
						<button class="input-group-shim">+</button>
						<textarea
							bind:value={newComment}
							class="bg-transparent border-0 ring-0"
							name="prompt"
							id="prompt"
							placeholder="Write a message..."
							rows="1"
						/>
						<button class="variant-filled-primary">Send</button>
					</div>
				</form>
				<button class="btn variant-filled-error mt-8" on:click={handleLogout}>Sign out</button>
			</div>
		{:else}
			<p>You must be logged in to add a comment.</p>
			<button class="btn variant-filled-primary" on:click={login}>
				Log in with Discord (Coming soon)
			</button>
		{/if}
	</section>
</article>
