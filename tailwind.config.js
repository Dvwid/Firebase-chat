module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				desktop: "url('./backgrounds/desktop.png')",
				tablets: "url('./backgrounds/medium.png')",
				mobile: "url('./backgrounds/mobile.png')",
				"first-desktop": "url('./backgrounds/firsttime/lg.png')",
				"first-tablets": "url('./backgrounds/firsttime/md.png')",
				"first-mobile": "url('./backgrounds/firsttime/s.png')",
			}),

			height: {
				max: "72vh",
				medium: "36rem",
			},
			fontFamily: {
				body: ["Indie Flower"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
