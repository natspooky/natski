import Footer from '../components/footer.js';
import Nav from '../components/nav.js';
import RootLayout from './rootLayout.js';

function CoverScreen() {
	const append = (self) => {
		self.classList.add('loaded');
		setTimeout(() => {
			self.remove();
		}, 800);
	};

	return {
		tag: 'section',
		attributes: {
			id: 'load',
		},
		onAppend: {
			callback: append,
			options: {
				awaitPageLoad: true,
			},
		},
	};
}

export default function StandardLayout({ children }) {
	console.log([children, Footer(), CoverScreen()]);

	const variab = [children, Footer(), CoverScreen()];

	return RootLayout({
		children: [
			Nav(),
			{
				tag: 'div',
				classes: 'main',
				attributes: {
					style: 'padding-top:60px;',
				},
				children: variab,
			},
		],
	});
}
