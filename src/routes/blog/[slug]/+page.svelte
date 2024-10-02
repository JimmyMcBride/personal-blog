<script lang="ts" defer>
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"
	import { page } from "$app/stores"
	import { onMount } from "svelte"
	import { userStore } from "sveltefire"
	import { auth } from "$lib/firebase"
	import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
	import { Avatar } from "@skeletonlabs/skeleton"
	const provider = new GoogleAuthProvider()

	let slug = $page.params.slug
	let totalViews: number
	let newComment = ""
	let comments = []
	const user = userStore(auth)

	onMount(async () => {
		const res = await fetch("/api/unique-views", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug }),
		})
		const data = await res.json()
		totalViews = data.totalViews
		comments = data.comments // Comments from the API
	})

	async function addComment() {
		if ($user) {
			const comment = {
				content: newComment,
				name: $user.displayName ?? "Anonymous",
				avatar: $user.photoURL ?? "",
				createdAt: new Date().toLocaleString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				}),
			}
			const res = await fetch("/api/add-comment", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slug, comment }),
			})
			if (res.ok) {
				comments = [...comments, comment]
				newComment = "" // Clear input
			} else {
				console.error("Failed to add comment")
			}
		}
	}

	function loginWithGoogle() {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log("Logged in", result.user)
			})
			.catch((error) => {
				console.error("Login failed", error)
			})
	}

	function signOut() {
		auth.signOut()
	}

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

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<article class="prose md:prose-lg lg:prose-xl mx-auto dark:prose-invert mb-16 p-4">
	<!-- Title -->
	<hgroup class="flex flex-col items-end">
		<h1 class="">{data.meta.title}</h1>
		<img src={data.meta.image} alt="blog banner" class="rounded-md" width="800px" />
		<p class="text-end text-sm">
			Published at {formatDate(data.meta.date)}
			<br />
			Total Views:
			{#if totalViews !== undefined}
				{totalViews}
			{/if}
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

	<!-- Comments Section -->
	<section class="comments mt-10">
		<h2>Comments</h2>

		{#if comments?.length > 0}
			{#each comments as comment}
				<div class="grid grid-cols-[auto_1fr] gap-2 mb-4">
					<Avatar src={comment.avatar} width="w-12" rounded="rounded-full" />
					<div class="card p-4 variant-soft rounded-tl-none space-y-2">
						<header class="flex justify-between">
							<small class="font-bold text-lg">{comment.name}</small>
							<small class="opacity-50">
								{comment.createdAt}
							</small>
						</header>
						<p>{comment.content}</p>
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
				<button class="btn variant-filled-error mt-8" on:click={signOut}>Sign out</button>
			</div>
		{:else}
			<p>You must be logged in to add a comment.</p>
			<button class="btn variant-filled-primary" on:click={loginWithGoogle}
				>Log in with Google</button
			>
		{/if}
	</section>
</article>
