<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button"
	import { cn } from "$lib/utils.js"

	let {
		currentPage,
		totalPages,
		onPageChange,
	}: {
		currentPage: number
		totalPages: number
		onPageChange?: (page: number) => void
	} = $props()

	let pageNumbers = $derived(Array.from({ length: totalPages }, (_, index) => index + 1))
</script>

{#if totalPages > 1}
	<nav
		class="mt-8 flex flex-wrap items-center justify-center gap-2"
		aria-label="Topic archive pagination"
	>
		<Button
			type="button"
			variant="outline"
			size="sm"
			disabled={currentPage === 1}
			aria-label="Previous page"
			onclick={() => onPageChange?.(currentPage - 1)}
		>
			Previous
		</Button>

		{#each pageNumbers as pageNumber}
			<button
				type="button"
				class={cn(
					buttonVariants(pageNumber === currentPage ? "default" : "outline", "sm"),
					"min-w-9 rounded-full px-3"
				)}
				aria-current={pageNumber === currentPage ? "page" : undefined}
				aria-label={`Go to page ${pageNumber}`}
				onclick={() => onPageChange?.(pageNumber)}
			>
				{pageNumber}
			</button>
		{/each}

		<Button
			type="button"
			variant="outline"
			size="sm"
			disabled={currentPage === totalPages}
			aria-label="Next page"
			onclick={() => onPageChange?.(currentPage + 1)}
		>
			Next
		</Button>
	</nav>
{/if}
