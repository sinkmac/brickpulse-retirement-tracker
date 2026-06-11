<script>
	import { resolve } from '$app/paths';
	let { setNumber, isObsolete = true } = $props();
	const url = $derived(`https://www.brickzone.co.uk/search?q=${encodeURIComponent(setNumber)}`);
</script>

{#if isObsolete === false}
	<section class="rounded-3xl border border-white/10 bg-bp-surface p-5 sm:p-7">
		<p class="font-display text-xl font-bold text-bp-text">Don't own it yet?</p>
		<a
			class="mt-4 inline-flex rounded-full border border-bp-accent px-5 py-3 font-display text-sm font-bold text-bp-accent transition hover:bg-bp-accent hover:text-black"
			href={resolve(url)}
			target="_blank"
			rel="noopener noreferrer">Find {setNumber} on BrickZone →</a
		>
	</section>
{/if}
