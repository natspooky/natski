export default function RootLayout({ children }) {
	return {
		tag: 'div',
		events: {
			change: {
				callback: () => window.location.reload(),
				target: screen.orientation,
			},
		},
		children,
	};
}
