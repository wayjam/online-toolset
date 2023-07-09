module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: ['./src/**/*.{html,js,svelte,ts}']
	},
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.container': {
					maxWidth: '100%',
					'@screen sm': {
						maxWidth: '768px'
					},
					'@screen md': {
						maxWidth: '1024px'
					},
					'@screen lg': {
						maxWidth: '1280px'
					},
					'@screen xl': {
						maxWidth: '1536px'
					},
					'@screen 2xl': {
						maxWidth: '1792px'
					}
				},
				'.editor-60vh': {
					height: '60vh'
				}
			});
		}
	]
};
