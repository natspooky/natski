function Fullscreen({ children }) {
	return {
		tag: 'div',
		style: {
			height: '100vh',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			gap: '20px',
			justifyContent: 'center',
			flexDirection: 'column',
		},
		children,
	};
}

export default Fullscreen;
