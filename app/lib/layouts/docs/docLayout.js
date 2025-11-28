import StandardLayout from '../standardLayout.js';

function SideNav() {
	return {
		tag: 'div',
	};
}

function TopNav() {
	return {
		tag: 'div',
	};
}

export default function DocumentationLayout({ children }) {
	return StandardLayout({
		children: [
			SideNav(),
			{
				tag: 'div',
				children: [TopNav(), children],
			},
		],
	});
}
