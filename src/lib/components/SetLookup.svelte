<script>
	import { createEventDispatcher } from 'svelte';
	import localDimensions from '$lib/data/set-dimensions.json';
	import { deriveTierFromDimensions, getTier } from '$lib/utils/matchCase.js';

	const dispatch = createEventDispatcher();

	let query = $state('');
	let loading = $state(false);
	let error = $state('');
	let manualMode = $state(false);
	let manual = $state({ w_cm: '', h_cm: '', d_cm: '' });

	function findLocal(value) {
		const clean = value.trim().toLowerCase();
		const entry = Object.entries(localDimensions).find(
			([setNumber, set]) =>
				setNumber.toLowerCase() === clean || set.name.toLowerCase().includes(clean)
		);
		if (!entry) return null;
		const [setNumber, dimensions] = entry;
		return {
			set_num: setNumber,
			name: dimensions.name,
			num_parts: null,
			year: null,
			is_obsolete: false,
			...getTier({ set_num: setNumber }, localDimensions)
		};
	}

	async function lookupRebrickable(value) {
		const key = import.meta.env.VITE_REBRICKABLE_API_KEY || '';
		if (!key) return null;
		const url = `https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(value)}&page_size=1`;
		const response = await fetch(url, { headers: { Authorization: `key ${key}` } });
		if (!response.ok) return null;
		const data = await response.json();
		const set = data.results?.[0];
		if (!set) return null;
		return {
			set_num: String(set.set_num || value).replace(/-1$/, ''),
			name: set.name,
			num_parts: set.num_parts,
			year: set.year,
			is_obsolete: Boolean(set.is_obsolete),
			...getTier(
				{ ...set, set_num: String(set.set_num || value).replace(/-1$/, '') },
				localDimensions
			)
		};
	}

	async function submitLookup() {
		const value = query.trim();
		if (!value) return;
		loading = true;
		error = '';
		manualMode = false;
		try {
			const local = findLocal(value);
			if (local) {
				dispatch('result', local);
				return;
			}
			const remote = await lookupRebrickable(value);
			if (remote) {
				dispatch('result', remote);
				return;
			}
			error = 'Set not found. Try the set number from the box.';
			manualMode = true;
		} finally {
			loading = false;
		}
	}

	function submitManual() {
		const dimensions = {
			name: query.trim() || 'Manual display estimate',
			w_cm: Number(manual.w_cm),
			h_cm: Number(manual.h_cm),
			d_cm: Number(manual.d_cm),
			verified: false
		};
		if (!dimensions.w_cm || !dimensions.h_cm || !dimensions.d_cm) return;
		const tier = deriveTierFromDimensions(dimensions);
		dispatch('result', {
			set_num: query.trim() || 'manual',
			name: dimensions.name,
			num_parts: null,
			year: null,
			is_obsolete: true,
			tier,
			verified: false,
			dimensions
		});
	}
</script>

<section
	class="rounded-3xl border border-white/10 bg-bp-surface p-5 shadow-2xl shadow-black/30 sm:p-7"
>
	<form
		class="grid gap-3 sm:grid-cols-[1fr_auto]"
		onsubmit={(event) => {
			event.preventDefault();
			submitLookup();
		}}
	>
		<label class="sm:col-span-2">
			<span class="font-display text-xs font-bold uppercase tracking-[0.18em] text-bp-muted"
				>Set number or name</span
			>
			<input
				class="mt-3 w-full rounded-2xl border border-white/10 bg-bp-bg px-4 py-3 font-mono text-lg text-bp-text outline-none ring-bp-accent/40 transition focus:ring-4"
				bind:value={query}
				placeholder="10280"
			/>
		</label>
		<p class="text-sm text-bp-muted sm:col-span-1">e.g. 10280 or “Flower Bouquet”</p>
		<button
			class="rounded-2xl bg-bp-accent px-5 py-3 font-display font-bold text-black transition hover:-translate-y-0.5"
			type="submit"
			disabled={loading}>{loading ? 'Checking…' : '→'}</button
		>
	</form>

	{#if loading}<p class="mt-4 text-sm text-bp-muted">Checking the catalogue...</p>{/if}
	{#if error}<p class="mt-4 text-sm text-bp-estimated">{error}</p>{/if}

	{#if manualMode}
		<div class="mt-5 grid gap-3 rounded-2xl border border-bp-estimated/30 bg-bp-estimated/10 p-4">
			<p class="font-display text-sm text-bp-estimated">Enter the display footprint manually.</p>
			<div class="grid grid-cols-3 gap-3">
				<input
					class="rounded-xl bg-bp-bg px-3 py-2 font-mono"
					bind:value={manual.w_cm}
					inputmode="decimal"
					placeholder="W cm"
				/>
				<input
					class="rounded-xl bg-bp-bg px-3 py-2 font-mono"
					bind:value={manual.h_cm}
					inputmode="decimal"
					placeholder="H cm"
				/>
				<input
					class="rounded-xl bg-bp-bg px-3 py-2 font-mono"
					bind:value={manual.d_cm}
					inputmode="decimal"
					placeholder="D cm"
				/>
			</div>
			<button
				class="w-fit rounded-xl border border-bp-estimated px-4 py-2 font-display text-sm font-bold text-bp-estimated"
				type="button"
				onclick={submitManual}>Use manual dimensions →</button
			>
		</div>
	{/if}
</section>
