import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Nav from '../components/nav.js';

export default function RootLayout({ children }) {
	return {
		tag: 'div',
		children,
	};
}
