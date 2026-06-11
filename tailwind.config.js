/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'bp-bg': '#0F0F0F',
				'bp-surface': '#1A1A1A',
				'bp-accent': '#FFD700',
				'bp-text': '#F0F0F0',
				'bp-muted': '#888888',
				'bp-verified': '#4CAF50',
				'bp-estimated': '#FFA500'
			},
			fontFamily: {
				display: ['Space Grotesk', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			}
		}
	},
	plugins: []
};
