<script>
	import { resolve } from '$app/paths';
	import '../app.css';

	const navLinks = [{ label: 'Display Case Tool', href: '/tools/display-case' }];
	let { children } = $props();
</script>

<svelte:head>
	<title>BrickPulse</title>
	<meta name="description" content="Display tools for people who care how it looks." />
</svelte:head>

<div class="min-h-screen bg-bp-bg text-bp-text antialiased">
	<header
		class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8"
	>
		<a class="font-display text-lg font-bold tracking-[0.22em] text-bp-accent" href={resolve('/')}>
			BRICKPULSE
		</a>
		<nav class="text-sm font-semibold text-bp-text/80">
			{#each navLinks as link (link.href)}
				<a class="transition hover:text-bp-accent" href={resolve(link.href)}>{link.label}</a>
			{/each}
		</nav>
	</header>

	{@render children()}

	<footer class="mx-auto w-full max-w-6xl px-5 py-8 text-sm text-bp-muted sm:px-8">
		<div class="border-t border-white/10 pt-6">
			<p class="font-display text-bp-text">BrickPulse · Display tools for collectors</p>
			<p class="mt-2 max-w-3xl">
				Affiliate disclosure: BrickPulse uses affiliate links. We earn a small commission if you buy
				through our links, at no cost to you.
			</p>
		</div>
	</footer>
</div>
