import RootLayout from './rootLayout.js';

export default function DocumentationLayout({ children }) {
	const contents = children; //[{}];

	return RootLayout({
		children: contents,
	});
}
