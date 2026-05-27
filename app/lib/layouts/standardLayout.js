import Footer from '../components/layout/footer.js';
import Nav from '../components/layout/nav.js';
import RootLayout from './rootLayout.js';

function StandardLayout({ children }) {
	return RootLayout({
		children: [
			{
				tag: 'div',
				style: {
					position: 'relative',
					paddingTop: '60px',
					width: '100%',
				},
				children: [
					{
						tag: 'main',
						children,
					},
					Footer(),
				],
			},
			Nav(),
		],
	});
}

export default StandardLayout;
