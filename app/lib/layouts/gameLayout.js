import Footer from '../components/layout/footer.js';
import RootLayout from './rootLayout.js';
import { useSuspense } from '../../../apis/encore/element-creator.js';

function GameLayout({ children }) {
	return RootLayout({
		children: {
			tag: 'div',
			children: [
				{
					tag: 'main',
					children,
				},
				Footer(),
			],
		},
	});
}

export default GameLayout;
