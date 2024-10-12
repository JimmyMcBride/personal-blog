<script lang="ts">
	import MyLinks from "$lib/components/MyLinks.svelte"
	import { description, title, url } from "$lib/config"
	import { Avatar } from "@skeletonlabs/skeleton"
	import { Icon } from "flowbite-svelte-icons"
	import Subscribe from "$lib/components/Subscribe.svelte"
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

<section class="flex flex-row-reverse justify-center mt-16 flex-wrap gap-40">
	<Avatar src="/me.webp" width="w-96" rounded="rounded-full" />
	<div class="gap-8 flex flex-col max-w-full">
		<h1 class="h1">
			<span
				class="bg-gradient-to-br dark:from-tertiary-300 dark:to-primary-500 from-secondary-500 to-primary-500 bg-clip-text text-transparent box-decoration-clone"
			>
				Hi, I'm Jimmy McBride!!!
			</span>
		</h1>
		<p class="max-w-4xl text-xl">
			As a devoted software engineer, I thrive in the world of app development. From delving deep
			into Linux server configurations to architecting full-stack SaaS platforms, I just love the
			process of creating things. By day, I'm a senior Android developer; by night, I tinker away at
			whatever currently has my interest. Check out my blog and find out what I've been getting into
			lately.
		</p>
		<MyLinks />
		<Subscribe />
	</div>
</section>
<section class="mt-16">
	<div class="flex justify-between flex-wrap gap-4">
		<div class="flex flex-col">
			<p class="text-primary-900-50-token text-8xl">6k+</p>
			<p class="text-primary-600-300-token">Contributions</p>
		</div>
		<div class="flex flex-col">
			<p class="text-primary-900-50-token text-8xl">90+</p>
			<p class="text-primary-600-300-token">Blogs</p>
		</div>
		<div class="flex flex-col">
			<p class="text-primary-900-50-token text-8xl">53k+</p>
			<p class="text-primary-600-300-token">Followers</p>
		</div>
		<div class="flex flex-col">
			<p class="text-primary-900-50-token text-8xl">197k+</p>
			<p class="text-primary-600-300-token">Blog Views</p>
		</div>
	</div>
</section>

<section class="my-16 flex justify-center flex-wrap gap-4">
	<div class="card variant-ringed-primary p-4 w-[32%] min-w-60">
		<Icon name="scale-balance-solid" class="h-12 w-12 mb-4 text-primary-500-400-token" />
		<h3 class="h2">Scalable</h3>
		<hr class="mb-4" />
		<p>
			Dedicated to excellence in scalability, I specialize in designing and deploying solutions that
			effortlessly adapt to growing demands. With a keen eye for optimization, I ensure that systems
			not only meet but exceed performance benchmarks, ensuring consistent operation and unwavering
			reliability even under increasing loads.
		</p>
	</div>
	<div class="card variant-ringed-primary p-4 w-[32%] min-w-60">
		<Icon name="computer-speaker-solid" class="h-12 w-12 mb-4 text-primary-500-400-token" />
		<h3 class="h2">Full Stack</h3>
		<hr class="mb-4" />
		<p>
			With a holistic approach to web development, I bridge the gap between front-end elegance and
			back-end efficiency. Proficient in an array of technologies, I seamlessly integrate user
			interfaces with powerful server logic, ensuring that each component of a project harmonizes to
			deliver smooth, responsive experiences.
		</p>
	</div>
	<div class="card variant-ringed-primary p-4 w-[32%] min-w-60">
		<Icon name="brain-solid" class="h-12 w-12 mb-4 text-primary-500-400-token" />
		<h3 class="h2">Simple By Design</h3>
		<hr class="mb-4" />
		<p>
			Adhering to the principle of 'Simple By Design', I prioritize clarity and user-centricity in
			every project. By intentionally avoiding over-complication, I ensure that solutions are
			efficient, intuitive, and maintainable. This design philosophy fosters streamlined user
			experiences and promotes long-term system stability.
		</p>
	</div>
</section>
