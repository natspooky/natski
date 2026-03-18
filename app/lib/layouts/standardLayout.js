import Footer from '../components/layout/footer.js';
import Nav from '../components/layout/nav.js';

import RootLayout from './rootLayout.js';
import { useSuspense } from '../../../apis/encore/element-creator.js';

export default function StandardLayout({ children }) {
	return RootLayout({
		children: [
			{
				tag: 'div',
				style: {
					position: 'relative',
					paddingTop: '90px',
					width: '100%',
				},
				children: useSuspense(() => {
					return [children, Footer()];
				}),
			},
			Nav(),
		],
	});
}
