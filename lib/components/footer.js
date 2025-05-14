import Button from './button.js';

export default function Footer() {
	const click = () => {
		window.parent.fram.changeHash('');
	};

	return {
		tag: 'footer',
		children: Button({
			icon: 'NATSKI',
			name: `© ${new Date().getFullYear()} Natski`,
			action: click,
		}),
	};
}
