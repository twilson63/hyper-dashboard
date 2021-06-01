module.exports = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			borderWidth: {
				'3': '3px'
			},
			borderRadius: {
				'large': '12px'
			},
			fontFamily: {
				'mono': ['PT Mono'],
				'space': ['Space Grotesk']
			},
			fontSize: {
				'1.5xl': ['18px', '34.47px'],
				'3xl': ['21px', '33.6px'],
				'4xl': ['32px', '36.32px'],
				'5xl': ['48px', '54.48px'],
				'8xl': ['76px', '82.5px']
			},
			colors: {
				'black': '#252A36',
				'darkgray': '#51555E',
				'gray': '#7C7F86',
				'lightgray': '#C6CAD3',
				'whitesmoke': '#F6F7F7',
				'yellow': '#FABC06',
				'lightyellow': '#FCD76A',
				'active-yellow': '#BC8D04',
				'orange': '#FE7621',
				'lightorange': '#FFB78A',
				'active-orange': '#CA5004',
				'red': '#FC4059',
				'lightred': '#FFA4B0',
				'active-red': '#D3223A',
				'purple': '#BA46DF',
				'lightpurple': '#F4BFFF',
				'active-purple': '#8502AF',
				'blue': '#1286F6',
				'lightblue': '#CDF2FF',
				'active-blue': '#0062C0',
				'green': '#2AB52E',
				'lightgreen': '#C3FFC5',
				'active-green': '#029F07'
			},
		},
	},
	plugins: [],
};
