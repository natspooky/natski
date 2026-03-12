export default function Section({ children }) {
	return {
		tag: 'section',
		style: {
			margin: '0px auto',
			padding: '30px 0',
			width: 'min(95%, 1000px)',
		},
		children,
	};
}
