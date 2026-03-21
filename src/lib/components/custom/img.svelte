<script lang="ts">
	let { src, alt }: { src: string; alt: string } = $props()
</script>

<img {src} {alt} loading="lazy" />
