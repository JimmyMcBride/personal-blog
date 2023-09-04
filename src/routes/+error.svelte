<script>
	import { page } from "$app/stores"
</script>

<div class="h-full flex flex-col justify-center items-center text-error-500-400-token">
	<h1 class="h1">Error: {$page.status}</h1>
	<h3 class="h3">{$page.error?.message}</h3>
</div>
