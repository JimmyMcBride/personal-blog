<script>
	import { page } from "$app/stores"
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center text-destructive">
	<h1 class="text-5xl font-bold">Error: {$page.status}</h1>
	<h3 class="text-2xl font-bold">{$page.error?.message}</h3>
</div>
