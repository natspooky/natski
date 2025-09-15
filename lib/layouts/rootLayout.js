import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Nav from '../components/nav.js';

export default function RootLayout({ children }) {
	const append = (self) => {
		setTimeout(() => {
			self.classList.add('loaded');
			setTimeout(() => {
				self.remove();
			}, 800);
		}, 10);
	};

	return [
		Nav(),
		Header({}),
		{
			tag: 'main',
			children,
		},
		Footer(),
		{
			tag: 'section',
			attributes: {
				id: 'load',
			},
			onAppend: {
				callback: append,
				options: {
					awaitContentLoad: true,
				},
			},
		},
	];
}
