import Footer from '../components/layout/footer.js';
import Nav from '../components/layout/nav.js';
import RootLayout from './rootLayout.js';
import { useSuspense } from '../../../apis/encore/element-creator.js';

function StandardLayout({ children }) {
	return RootLayout({
		children: [
			{
				tag: 'div',
				style: {
					position: 'relative',
					paddingTop: '90px',
					width: '100%',
				},
				children: [
					{
						tag: 'main',
						//children: useSuspense(() => {
						/*return*/ children,
						//}, 'loading data'),
					},
					Footer(),
				],
			},
			Nav(),
		],
	});
}

export default StandardLayout;
