<script>
	let { result } = $props();
	const dimensionsText = $derived(
		result.dimensions
			? `${result.dimensions.w_cm} × ${result.dimensions.h_cm} × ${result.dimensions.d_cm} cm`
			: 'No verified dimensions'
	);
	const metaText = $derived(
		[
			result.num_parts ? `${result.num_parts} pieces` : 'Piece count not loaded',
			result.year ? `${result.year}` : 'Year not loaded'
		].join(' · ')
	);
</script>

<article
	class={`rounded-3xl border p-5 sm:p-7 ${result.verified ? 'border-bp-verified/40 bg-bp-verified/10' : 'border-bp-estimated/40 bg-bp-estimated/10'}`}
>
	<p class="font-mono text-3xl font-black text-bp-accent sm:text-5xl">{result.set_num}</p>
	<h2 class="mt-3 font-display text-2xl font-bold text-bp-text sm:text-4xl">{result.name}</h2>
	<p class="mt-2 text-sm text-bp-muted">{metaText}</p>
	{#if result.verified}
		<p
			class="mt-5 inline-flex rounded-full border border-bp-verified/40 bg-bp-verified/10 px-4 py-2 font-mono text-sm text-bp-verified"
		>
			✓ verified · {dimensionsText}
		</p>
	{:else}
		<p
			class="mt-5 inline-flex rounded-2xl border border-bp-estimated/40 bg-bp-estimated/10 px-4 py-2 text-sm font-bold text-bp-estimated"
		>
			⚠ Dimensions not verified — showing cases for ~{result.tier} sets
		</p>
	{/if}
</article>
