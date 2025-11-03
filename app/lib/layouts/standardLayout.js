import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Nav from '../components/nav.js';
import RootLayout from './rootLayout.js';

export default function StandardLayout({ children }) {
	const append = (self) => {
		setTimeout(() => {
			self.classList.add('loaded');
			setTimeout(() => {
				self.remove();
			}, 800);
		}, 10);
	};

	const headerContents = [];

	return RootLayout({
		children: {
			tag: 'div',
			events: {
				change: {
					callback: () => window.location.reload(),
					target: screen.orientation,
				},
			},

			children: [
				Nav(),
				Header({ children: headerContents }),
				{
					tag: 'main',
					children,
				},
				Footer(),
				{
					tag: 'section',
					attributes: {
						id: 'load',
						style: 'opacity: 0',
					},
					onAppend: {
						callback: append,
						options: {
							awaitFontLoad: false,
						},
					},
				},
			],
		},
	});
}
