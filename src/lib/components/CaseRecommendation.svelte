<script>
	import { resolve } from '$app/paths';
	import { labelCaseFit } from '$lib/utils/matchCase.js';
	let { cases = [], verified = false, tier = 'medium' } = $props();
</script>

<section class="grid gap-4">
	<h2 class="font-display text-2xl font-bold text-bp-text">Recommended case</h2>
	{#each cases as caseItem, index (caseItem.id)}
		<article
			class="grid gap-4 rounded-3xl border border-white/10 bg-bp-surface p-4 sm:grid-cols-[160px_1fr] sm:p-5"
		>
			{#if caseItem.img_url}
				<img
					class="h-36 w-full rounded-2xl object-cover"
					src={caseItem.img_url}
					alt={caseItem.name}
				/>
			{:else}
				<div
					class="flex h-36 items-center justify-center rounded-2xl border border-white/10 bg-bp-bg text-xs uppercase tracking-[0.18em] text-bp-muted"
				>
					Image pending
				</div>
			{/if}
			<div>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-bp-accent">
					{labelCaseFit(index)}
				</p>
				<h3 class="mt-2 font-display text-xl font-bold text-bp-text">{caseItem.name}</h3>
				<p class="mt-2 font-mono text-sm text-bp-muted">
					{caseItem.w_cm} × {caseItem.h_cm} × {caseItem.d_cm} cm
				</p>
				<p class="mt-2 font-display text-2xl font-bold text-bp-text">
					£{caseItem.price_gbp.toFixed(2)}
				</p>
				<a
					class={`mt-4 inline-flex rounded-full px-5 py-3 font-display text-sm font-bold transition hover:-translate-y-0.5 ${verified ? 'bg-bp-verified text-black' : 'bg-bp-estimated text-black'}`}
					href={resolve(caseItem.awin_url)}
					target="_blank"
					rel="noopener noreferrer"
				>
					{verified
						? 'Display it properly →'
						: `View ${tier} cases — confirm fit before ordering →`}
				</a>
			</div>
		</article>
	{/each}
</section>
