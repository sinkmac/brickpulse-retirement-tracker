<script>
	import SetLookup from '$lib/components/SetLookup.svelte';
	import SetCard from '$lib/components/SetCard.svelte';
	import CaseRecommendation from '$lib/components/CaseRecommendation.svelte';
	import BrickZoneLink from '$lib/components/BrickZoneLink.svelte';
	import cases from '$lib/data/idisplayit-cases.json';
	import { recommendCase } from '$lib/utils/matchCase.js';

	let result = $state(null);
	const recommendations = $derived(
		result ? recommendCase(result.tier, cases, result.verified ? result.dimensions : null) : []
	);

	function handleResult(event) {
		result = event.detail;
	}
</script>

<svelte:head>
	<title>Find a Display Case — BrickPulse</title>
	<meta name="description" content="Enter a set number or name. We'll find the right case." />
</svelte:head>

<main class="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 sm:py-16">
	<section class="max-w-3xl">
		<p class="font-display text-sm font-bold uppercase tracking-[0.22em] text-bp-accent">
			Display Case Tool
		</p>
		<h1 class="mt-4 font-display text-4xl font-bold text-bp-text sm:text-6xl">
			What case fits your build?
		</h1>
		<p class="mt-4 text-lg text-bp-muted">Enter a set number or name. We'll find the right case.</p>
	</section>

	<SetLookup on:result={handleResult} />

	{#if result}
		<SetCard {result} />
		<CaseRecommendation cases={recommendations} verified={result.verified} tier={result.tier} />
		<BrickZoneLink setNumber={result.set_num} isObsolete={result.is_obsolete} />
	{/if}

	<p class="border-t border-white/10 pt-6 text-sm leading-relaxed text-bp-muted">
		Dimensions marked ✓ are verified against manufacturer data. Estimated sizes (~) are based on
		piece count — always confirm measurements before ordering.
	</p>
</main>
