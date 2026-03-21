<script>
	import { page } from "$app/stores"
</script>

<div class="h-full flex flex-col justify-center items-center text-[--color-error-500]">
	<h1 class="h1">Error: {$page.status}</h1>
	<h3 class="h3">{$page.error?.message}</h3>
</div>
