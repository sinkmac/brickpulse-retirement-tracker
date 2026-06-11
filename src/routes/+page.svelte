<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>BrickPulse — Display tools for collectors</title>
	<meta name="description" content="Display tools for people who care how it looks." />
</svelte:head>

<main class="flex min-h-[calc(100vh-11rem)] items-center justify-center px-5 py-16 sm:px-8">
	<section class="mx-auto max-w-[640px] text-center">
		<p class="font-display text-5xl font-bold tracking-[0.18em] text-bp-accent sm:text-7xl">
			BRICKPULSE
		</p>
		<h1 class="mt-10 font-display text-4xl font-semibold leading-tight text-bp-text sm:text-6xl">
			Display tools for people who care how it looks.
		</h1>
		<div class="mt-10">
			<a
				class="inline-flex items-center justify-center rounded-full bg-bp-accent px-6 py-3 font-display text-base font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,215,0,0.22)]"
				href={resolve('/tools/display-case')}
			>
				Find a case for your set →
			</a>
		</div>
		<div class="mt-12 border-t border-white/10 pt-8">
			<p class="text-sm text-bp-muted">
				More tools coming. Built for collectors, by people who get it.
			</p>
			<p class="mt-4 text-xs leading-relaxed text-bp-muted">
				BrickPulse uses affiliate links. We earn a small commission if you buy through our links, at
				no cost to you.
			</p>
		</div>
	</section>
</main>
