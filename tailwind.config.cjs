const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			filter: ['hover'],
			colors: {
				cyclamen: {
					50: '#fbe6ec',
					100: '#f6c0d0',
					200: '#f199b2',
					300: '#ec7494', // prime
					400: '#e65c7e',
					500: '#e54868',
					600: '#d44365',
					700: '#be3e5f',
					800: '#a9385b',
					900: '#852e51'
				},
				'russian-violet': {
					50: '#e6e5f0',
					100: '#c0beda',
					200: '#9795c0',
					300: '#706da7',
					400: '#564f96',
					500: '#3d3284',
					600: '#372b7c',
					700: '#302271',
					800: '#281865',
					900: '#1b0650'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
